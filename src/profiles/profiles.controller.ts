import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfilesDto } from './dtos/create-profiles.dto';
import { UpdateProfilesDto } from './dtos/update-profiles.dto';
import { Response } from 'express';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guards/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Profile } from './profiles.model';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
    
    constructor(private readonly profilesService: ProfilesService) {}

    @ApiOperation({summary: 'Создание профиля'})
    @ApiResponse({status: 200, description: "Success", type: Profile})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Post()
    create(@Body() dto: CreateProfilesDto) {
        return this.profilesService.createProfile(dto);
    }

    @ApiOperation({summary: 'Получение всех профилей'})
    @ApiResponse({status: 200, description: "Success", type: [Profile]})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.profilesService.findAllProfiles();
    }

    @ApiOperation({summary: 'Получение профиля по #id'})
    @ApiParam({name: "id", type: Number, example: 1, description: "Уникальный идентификатор профиля"})
    @ApiResponse({status: 200, description: "Success", type: Profile})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.profilesService.findOneProfile(+id);
    }

    @ApiOperation({summary: 'Обновление профиля по #id'})
    @ApiResponse({status: 200, description: "Success", type: UpdateProfilesDto})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateProfilesDto) {

        return this.profilesService.updateProfile(+id, dto);
    }

    @ApiOperation({summary: 'Удаление профиля по #id'})
    @ApiParam({name: "id", type: Number, example: 1, description: "Уникальный идентификатор профиля"})
    @ApiResponse({status: 200, description: "Success"})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.profilesService.removeProfile(+id);
    }
}
