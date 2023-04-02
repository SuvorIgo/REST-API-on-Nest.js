import { ApiProperty } from "@nestjs/swagger";

export class CreateTextBlockDto {
    
    @ApiProperty({example: 'main-hero-text', description: 'Уникальное название'})
    textBlock_string: string;

    @ApiProperty({example: 'main', description: 'Название блока'})
    name: string;

    @ApiProperty({example: 'image123.png', description: 'Наименование картинки.расширение'})
    image: string;

    @ApiProperty({example: 'Hello World!', description: 'Текст блока'})
    text: string;

    @ApiProperty({example: 'main-group', description: 'Наименование группы'})
    group: string;
}