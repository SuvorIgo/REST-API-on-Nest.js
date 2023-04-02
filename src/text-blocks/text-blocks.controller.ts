import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTextBlockDto } from './dtos/create-text-block.dto';
import { UpdateTextBlockDto } from './dtos/update-text-block.dto';
import { TextBlocksService } from './text-blocks.service';
import { Roles } from 'src/auth/guards/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { SaveFileDto } from 'src/files/dtos/save-file.dto';
import { TextBlock } from './text-blocks.model';

@ApiTags('TextBlocks')
@Controller('text-blocks')
export class TextBlocksController {

    constructor(private textBlockService: TextBlocksService) {}

    @ApiOperation({summary: 'Создание текстового блока'})
    @ApiResponse({status: 200, description: "Success", type: TextBlock})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() dto: CreateTextBlockDto, fileDto: SaveFileDto) {
        return this.textBlockService.createTextBlock(dto, fileDto);
    }

    @ApiOperation({summary: 'Получение всех текстовых блоков'})
    @ApiResponse({status: 200, description: "Success", type: [TextBlock]})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.textBlockService.getAllTextBlocks();
    }

    @ApiOperation({summary: 'Получение всех текстовых блоков, отфильтрованных по #group'})
    @ApiResponse({status: 200, description: "Success", type: [TextBlock]})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get('/order')
    getAllOrderByGroup() {
        return this.textBlockService.getAllTextBlocksOrderByGroup();
    }

    @ApiOperation({summary: 'Получение текстового блока по #stringId'})
    @ApiParam({name: "stringId", type: String, example: "main-hero-text", description: "Уникальное название"})
    @ApiResponse({status: 200, description: "Success", type: TextBlock})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get(':stringId')
    getByStringId(@Param('stringId') stringId: string) {
        return this.textBlockService.getTextBlockByStringId(stringId);
    }

    @ApiOperation({summary: 'Обновление текстового блока по #stringId'})
    @ApiParam({name: "stringId", type: String, example: "main-hero-text", description: "Уникальное название"})
    @ApiResponse({status: 200, description: "Success", type: UpdateTextBlockDto})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Patch(':stringId')
    updateByStringId(@Param('stringId') stringId: string, @Body() dto: UpdateTextBlockDto) {
        return this.textBlockService.updateTextBlockByStringId(stringId, dto);
    }

    @ApiOperation({summary: 'Удаление текстового блока по #stringId'})
    @ApiParam({name: "stringId", type: String, example: "main-hero-text", description: "Уникальное название"})
    @ApiResponse({status: 200, description: "Success"})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete(':stringId')
    removeByStringId(@Param('stringId') stringId: string) {
        return this.textBlockService.removeTextBlockByStringId(stringId);
    }
}
