import { Body, Controller, Delete, Param, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { SaveFileDto } from './dtos/save-file.dto';
import { Roles } from 'src/auth/guards/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { File } from './files.model';

@ApiTags('Files')
@Controller('files')
export class FilesController {

    constructor(private fileService: FilesService) {}

    @ApiOperation({summary: 'Добавление файла в папку images'})
    @ApiResponse({status: 200, description: "Success"})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Post()
    @UseInterceptors(FileInterceptor('picture', { dest: './images/' }))
    uploadfile(@UploadedFiles() files): string {
        return "File was uploaded";
    }

    @ApiOperation({summary: 'Создание записи в таблице'})
    @ApiResponse({status: 200, description: "Success", type: File})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Post()
    createFile(@Body() dto: SaveFileDto) {
        return this.fileService.saveImage(dto);
    }

    @ApiOperation({summary: 'Удаление файла по #id'})
    @ApiParam({name: "id", type: Number, example: 1, description: "Уникальный идентификатор файла"})
    @ApiResponse({status: 200, description: "Success"})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete(':id')
    removeOneFile(@Param() id: number) {
        return this.fileService.removeOneFile(id);
    }

    @ApiOperation({summary: 'Удаление файлов по #id[]'})
    @ApiParam({name: "id", type: [Number], example: [1, 2, 3], description: "Уникальный идентификатор файла"})
    @ApiResponse({status: 200, description: "Success"})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    removeMoreFiles(@Body() id: number[]) {
        return this.fileService.removeMoreFiles(id);
    }
}
