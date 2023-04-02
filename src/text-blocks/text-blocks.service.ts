import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TextBlock } from './text-blocks.model';
import { CreateTextBlockDto } from './dtos/create-text-block.dto';
import { UpdateTextBlockDto } from './dtos/update-text-block.dto';
import { FilesService } from 'src/files/files.service';
import { SaveFileDto } from 'src/files/dtos/save-file.dto';

@Injectable()
export class TextBlocksService {

    constructor(@InjectModel(TextBlock) private textBlockRepository: typeof TextBlock,
                private fileService: FilesService) {}

    async createTextBlock(dto: CreateTextBlockDto, fileDto: SaveFileDto) {
        const textBlock = await this.textBlockRepository.create(dto);
        
        fileDto.essenceTable = "TextBlock";
        fileDto.essenceId = textBlock.textBlock_id;
        fileDto.name = textBlock.name;

        await this.fileService.saveImage(fileDto)

        return textBlock;
    }

    async getAllTextBlocks() {
        const textBlocks = await this.textBlockRepository.findAll();

        return textBlocks;
    }

    async getAllTextBlocksOrderByGroup() {
        const textBlocks = await this.textBlockRepository.findAll({order: [['group', 'ASC']]});

        return textBlocks;
    }

    async getTextBlockByStringId(stringId: string) {
        const textBlock_string = stringId;

        const textBlock = await this.textBlockRepository.findOne({where: {textBlock_string}});

        return textBlock;
    }

    async updateTextBlockByStringId(stringId: string, dto: UpdateTextBlockDto) {
        const textBlock_string = stringId;

        await this.textBlockRepository.update({...dto}, {where: {textBlock_string}})

        return dto;
    }

    async removeTextBlockByStringId(stringId: string) {
        const textBlock_string = stringId;

        const textBlock = this.getTextBlockByStringId(textBlock_string);

        const textBlock_id = (await textBlock).textBlock_id;

        await this.textBlockRepository.destroy({where: {textBlock_string}});

        return {"destroyId": textBlock_id};
    }
}
