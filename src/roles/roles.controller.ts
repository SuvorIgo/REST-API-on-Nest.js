import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dtos/create-role.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './roles.model';
import { UpdateRoleDto } from './dtos/update-role.dto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
    constructor(private readonly roleService: RolesService) {}
    
    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: Role})
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    @ApiOperation({summary: 'Получение всех ролей'})
    @ApiResponse({status: 200, type: [Role]})
    @Get()
    getAll() {
        return this.roleService.getAllRoles();
    }

    @ApiOperation({summary: 'Получение роли по #value'})
    @ApiParam({name: "value", type: String, example: "USER", description: "Значение роли пользователя"})
    @ApiResponse({status: 200, type: Role})
    @Get(':value')
    getByValue(@Param('value') value: string) {
        return this.roleService.getRoleByValue(value);
    }

    @ApiOperation({summary: 'Обновление роли по #value'})
    @ApiParam({name: "value", type: String, example: "USER", description: "Значение роли пользователя"})
    @ApiResponse({status: 200, type: UpdateRoleDto})
    @Patch(':value')
    updateByValue(@Param('value') value: string, @Body() dto: UpdateRoleDto) {
        return this.roleService.updateRoleByValue(value, dto);
    }

    @ApiOperation({summary: 'Удаление роли по #value'})
    @ApiParam({name: "value", type: String, example: "USER", description: "Значение роли пользователя"})
    @ApiResponse({status: 200})
    @Delete(':value')
    removeByValue(@Param('value') value: string) {
        return this.roleService.removeRoleByValue(value);
    }
}
