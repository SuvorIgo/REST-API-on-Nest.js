import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { TextBlocksModule } from 'src/text-blocks/text-blocks.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => TextBlocksModule),
    forwardRef(() => ProfilesModule),
    forwardRef(() => FilesModule),
    ProfilesModule,
    JwtModule.register({
      secret: process.env.JWT_PRIVATE_KEY || "SECRET",
      signOptions: {
        expiresIn: '24h'
      }
    })
  ],
  exports: [
    AuthService,
    JwtModule
  ],
})
export class AuthModule {}
