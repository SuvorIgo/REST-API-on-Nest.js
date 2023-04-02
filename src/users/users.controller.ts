import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { User } from './users.model';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/guards/roles-auth.decorator';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AddRoleDto } from './dtos/add-role.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({summary: 'Получение всех пользователей'})
    @ApiResponse({status: 200, description: "Success", type: [User]})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: 'Получение пользователя по #user_id'})
    @ApiParam({name: "id", type: Number, example: 1, description: "Уникальный идентификатор пользователя"})
    @ApiResponse({status: 200, description: "Success", type: User})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get(':id')
    getOneUser(@Param('id') id: number) {
        return this.usersService.getUserById(+id);
    }

    @ApiOperation({summary: 'Обновление данных пользователя по #user_id'})
    @ApiParam({name: "id", type: Number, example: 1, description: "Уникальный идентификатор пользователя"})
    @ApiResponse({status: 200, description: "Success", type: UpdateUserDto})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Patch(':id')
    update(@Param('id') id: number, @Body() userDto: UpdateUserDto) {
        return this.usersService.updateUser(+id, userDto);
    }

    @ApiOperation({summary: 'Выдача роли'})
    @ApiResponse({status: 200, description: "Success"})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }

    @ApiOperation({summary: 'Удаление пользователя по #user_id'})
    @ApiParam({name: "id", type: Number, example: 1, description: "Уникальный идентификатор пользователя"})
    @ApiResponse({status: 200, description: "Success"})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.usersService.removeUser(+id);
    }
}
