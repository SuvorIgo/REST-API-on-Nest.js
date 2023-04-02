import { HttpStatus, HttpException, Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './users.model';
import { RolesService } from 'src/roles/roles.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AddRoleDto } from './dtos/add-role.dto';
import { RegistrationUserDto } from 'src/auth/dtos/registration-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RolesService) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create({...dto});
        const role = await this.roleService.getRoleByValue("ADMIN");

        await user.$set('roles', [role.role_id]);

        user.roles = [role];
        
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}});

        return users;
    }

    async getUserByLogin(login: string) {
        const user = await this.userRepository.findOne({where: {login}, include: {all: true}});

        return user;
    }

    async getUserById(id: number) {
        const user_id = id;

        const user = await this.userRepository.findOne({where: {user_id}});

        return user;
    }

    async updateUser(id: number, dto: UpdateUserDto) {
        const user_id = id;

        await this.userRepository.update({...dto}, {where: {user_id}});
        
        return dto;
    }

    async removeUser(id: number) {
        const user_id = id;

        await this.userRepository.destroy({where: {user_id}});

        return {"destroyId": user_id};
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);

        if (role && user) {
            await user.$add('role', role.role_id);
            return dto;
        }

        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    }
}


