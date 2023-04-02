import { Body, Controller, Post, Request, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { RegistrationUserDto } from './dtos/registration-user.dto';
import { Response } from 'express';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @ApiOperation({summary: 'Авторизация пользователя'})
    @ApiResponse({status: 200, description: "Success", })
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Post('/login')
    login(@Res({ passthrough: true }) res: Response, @Body() dto: CreateUserDto) {
        res.cookie('user_id', dto.login)
        return this.authService.login(dto);
    }

    @ApiOperation({summary: 'Регистрация пользователя'})
    @ApiResponse({status: 200, description: "Success"})
    @ApiResponse({ status: 400, description: "Bad Request" })
    @Post('/registration')
    registration(@Res({ passthrough: true }) res: Response, @Body() dto: RegistrationUserDto) {
        res.cookie('user_id', dto.login);
        return this.authService.registration(dto);
    }
}
