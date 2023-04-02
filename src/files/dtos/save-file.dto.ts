import { ApiProperty } from "@nestjs/swagger";

export class SaveFileDto {

    @ApiProperty({example: 'profile', description: 'Наименоваание таблицы, в которой используется файл'})
    essenceTable: string;

    @ApiProperty({example: '17', description: 'Уникальный идентификатор сущности'})
    essenceId: number;

    @ApiProperty({example: 'image1.png', description: 'Наименование файла.расширение'})
    name: string;
}