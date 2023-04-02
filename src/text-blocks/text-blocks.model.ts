import { ApiProperty } from "@nestjs/swagger";
import { Column, Model, Table, DataType, BelongsToMany } from "sequelize-typescript";

interface TextBlockCreationAttributes {
    textBlock_string: string;
    name: string;
    image: string;
    text: string;
    group: string;
}

@Table({tableName: 'TextBlocks'})
export class TextBlock extends Model<TextBlock, TextBlockCreationAttributes> {
    
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    textBlock_id: number;

    @ApiProperty({example: 'main-hero-text', description: 'Уникальное название'})
    @Column({
        type: DataType.STRING,
        unique: true,
        primaryKey: true,
    })
    textBlock_string: string;

    @ApiProperty({example: 'main', description: 'Название блока'})
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @ApiProperty({example: 'image123.png', description: 'Наименование картинки.расширение'})
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    image: string;

    @ApiProperty({example: 'Hello World!', description: 'Текст блока'})
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    text: string;

    @ApiProperty({example: 'main-group', description: 'Наименование группы'})
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    group: string;
}