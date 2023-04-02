import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dtos/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { UpdateRoleDto } from './dtos/update-role.dto';

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private roleRespository: typeof Role) {}

    async createRole(dto: CreateRoleDto) {
        const role = await this.roleRespository.create(dto);

        return role;
    }

    async getRoleByValue(value: string) {
        const role = await this.roleRespository.findOne({where: {value}})

        return role;
    }

    async getAllRoles() {
        const roles = await this.roleRespository.findAll();

        return roles;
    }

    async updateRoleByValue(value: string, dto: UpdateRoleDto) {
        const candidate = await this.getRoleByValue(value);
        
        const role_id = candidate.role_id;

        await this.roleRespository.update({...dto}, {where: {role_id}});

        return dto;
    } 

    async removeRoleByValue(value: string) {
        const candidate = await this.getRoleByValue(value);

        const role_id = candidate.role_id;

        await this.roleRespository.destroy({where: {role_id}});

        return {"destroyId": role_id};
    }
}
