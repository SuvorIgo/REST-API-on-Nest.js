import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users/users.model";
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UsersRoles } from "./users-roles/users-roles.model";
import { AuthModule } from './auth/auth.module';
import { ProfilesModule } from './profiles/profiles.module';
import { Profile } from "./profiles/profiles.model";
import { TextBlocksModule } from './text-blocks/text-blocks.module';
import { TextBlock } from "./text-blocks/text-blocks.model";
import { FilesModule } from './files/files.module';
import { File } from "./files/files.model";

@Module({
    controllers: [
        
    ],
    providers: [
        
    ],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.PG_HOST,
            port: Number(process.env.PG_PORT),
            username: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_DB,
            models: [
                User,
                Role,
                UsersRoles,
                Profile,
                TextBlock,
                File
            ],
            autoLoadModels: true,
            synchronize: true,
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        ProfilesModule,
        TextBlocksModule,
        FilesModule,
    ],
})

export class AppModule {}