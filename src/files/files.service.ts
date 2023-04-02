import { Injectable, UploadedFile } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { File } from './files.model';
import { SaveFileDto } from './dtos/save-file.dto';

@Injectable()
export class FilesService {

    constructor(@InjectModel(File) private fileRepository: typeof File) {}

    async saveImage(dto: SaveFileDto) {
        const image = this.fileRepository.create(dto);

        return image;
    }

    async removeOneFile(id: number) {
        const file_id = id; 

        await this.fileRepository.destroy({where: {file_id}})

        return "Object was removed"
    }

    async removeMoreFiles(id: number[]) {
        for(let i = 0; i < id.length; i++) {
            let file_id = id[i];

            const fileData = await this.fileRepository.findOne({where: {file_id}});

            const nowD = Date.now();

            if (!fileData.essenceId && !fileData.essenceTable ||
                (Date.now() - +fileData.createdAt) > 60 * 60 * 1000)
                {
                    await this.fileRepository.destroy({where: {file_id}});
                }
        }

        return "Objects was removed"
    }
}
