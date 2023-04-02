import { ApiProperty } from "@nestjs/swagger";
import { Column, Model, Table, DataType, BelongsToMany, BelongsTo, HasOne } from "sequelize-typescript";
import { Profile } from "src/profiles/profiles.model";
import { Role } from "src/roles/roles.model";
import { UsersRoles } from "src/users-roles/users-roles.model";

interface UserCreationAttributes {
    login: string;
    password: string;
}

@Table({tableName: 'Users'})
export class User extends Model<User, UserCreationAttributes> {
    
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    user_id: number;

    @ApiProperty({example: 'user@mail.ru', description: 'Логин пользователя (почтовый адрес)'})
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    login: string;

    @ApiProperty({example: 'qwerty', description: 'Пароль пользователя'})
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @BelongsToMany(() => Role, () => UsersRoles)
    roles: Role[];

    @HasOne(() => Profile)
    profile: Profile;
}