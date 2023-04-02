import { ApiProperty } from "@nestjs/swagger";
import { Column, Model, Table, DataType } from "sequelize-typescript";

interface FileCreationAttributes {
    name: string;
}

@Table({tableName: 'Files'})
export class File extends Model<File, FileCreationAttributes> {
    
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    file_id: number;

    @ApiProperty({example: 'profile', description: 'Наименоваание таблицы, в которой используется файл'})
    @Column({
        type: DataType.STRING,
    })
    essenceTable: string;

    @ApiProperty({example: '17', description: 'Уникальный идентификатор сущности'})
    @Column({
        type: DataType.INTEGER,
    })
    essenceId: number;

    @ApiProperty({example: 'image1.png', description: 'Наименование файла.расширение'})
    @Column({
        type: DataType.STRING,
    })
    name: string;
}