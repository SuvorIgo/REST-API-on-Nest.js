import { Module, forwardRef } from '@nestjs/common';
import { TextBlocksController } from './text-blocks.controller';
import { TextBlocksService } from './text-blocks.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TextBlock } from './text-blocks.model';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [TextBlocksController],
  providers: [TextBlocksService],
  imports: [
    FilesModule,
    SequelizeModule.forFeature([TextBlock]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    TextBlocksService
  ],
})
export class TextBlocksModule {}