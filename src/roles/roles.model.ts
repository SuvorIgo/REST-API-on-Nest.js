import { ApiProperty } from "@nestjs/swagger";
import { Column, Model, Table, DataType, BelongsToMany } from "sequelize-typescript";
import { UsersRoles } from "src/users-roles/users-roles.model";
import { User } from "src/users/users.model";

interface RoleCreationAttributes {
    value: string;
    description: string;
}

@Table({tableName: 'Roles'})
export class Role extends Model<Role, RoleCreationAttributes> {
    
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    role_id: number;

    @ApiProperty({example: 'ADMIN', description: 'Значение роли пользователя'})
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    value: string;

    @ApiProperty({example: 'Администратор', description: 'Описание роли'})
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: string;

    @BelongsToMany(() => User, () => UsersRoles)
    users: User[];
}