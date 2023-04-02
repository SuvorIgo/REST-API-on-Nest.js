import { ApiProperty } from "@nestjs/swagger";
import { Column, Model, Table, DataType, ForeignKey, BelongsTo, HasOne } from "sequelize-typescript";
import { User } from "src/users/users.model";

interface ProfileCreationAttributes {
    login: string;
    password: string;
}

@Table({tableName: 'Profiles'})
export class Profile extends Model<Profile, ProfileCreationAttributes> {
    
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    profile_id: number;

    @ApiProperty({example: 'Маша', description: 'Имя пользователя'})
    @Column({
        type: DataType.STRING,
    })
    name: string;

    @ApiProperty({example: 'Машина', description: 'Фамилия пользователя'})
    @Column({
        type: DataType.STRING,
    })
    surname: string;

    @ApiProperty({example: 'Ивановна', description: 'Отчество пользователя'})
    @Column({
        type: DataType.STRING,
    })
    patronymic: string;

    @ApiProperty({example: '89194782674', description: 'Номер телефона пользователя'})
    @Column({
        type: DataType.INTEGER        
    })
    numberPhone: number;

    @ApiProperty({example: 'М', description: 'Гендерная принадлежность пользователя'})
    @Column({
        type: DataType.STRING,
    })
    gender: string;

    @ApiProperty({example: '1 январия 2011', description: 'Дата рождения пользователя'})
    @Column({
        type: DataType.DATE,
    })
    dateBirth: Date;

    @ApiProperty({example: 'Старый Оскол', description: 'Город пользователя'})
    @Column({
        type: DataType.STRING,
    })
    city: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
    })
    user_id: number;  
}