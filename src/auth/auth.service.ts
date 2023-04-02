import { HttpException, HttpStatus, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import { RegistrationUserDto } from './dtos/registration-user.dto';
import { ProfilesService } from 'src/profiles/profiles.service';
import { response } from 'express';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService,
                private profileService: ProfilesService) {}

    async login(dto: CreateUserDto) {
        const user = await this.validateUser(dto)

        return this.generateToken(user);
    }

    async registration(dto: RegistrationUserDto) {
        const candidate = await this.userService.getUserByLogin(dto.login);

        if (candidate) {
            throw new HttpException(`Пользователь с таким login'ом уже существует`, HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(dto.password, 3);

        const user = await this.userService.createUser({...dto, password: hashPassword});

        const user_id = user.user_id;

        const profile = await this.profileService.createProfile({...dto, user_id: user_id});

        await user.$set('profile', profile);

        return this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = {login: user.login, id: user.user_id, roles: user.roles};

        return {
            token: this.jwtService.sign(payload),
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByLogin(userDto.login);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);

        if (user && passwordEquals) {
            return user;
        }

        throw new UnauthorizedException({message: 'Некорректный login или password'});
    }
}
