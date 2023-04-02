import { Injectable } from '@nestjs/common';
import { CreateProfilesDto } from './dtos/create-profiles.dto';
import { UpdateProfilesDto } from './dtos/update-profiles.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from './profiles.model';

@Injectable()
export class ProfilesService {

    constructor(@InjectModel(Profile) private profileRepository: typeof Profile) {}

    async createProfile(dto: CreateProfilesDto) {
        const profile = await this.profileRepository.create(dto);

        return profile
    }
    
    async findAllProfiles() {
        const profiles = await this.profileRepository.findAll();

        return profiles;
    }
    
    async findOneProfile(id: number) {
        const profile = await this.profileRepository.findByPk(id);

        return profile;
    }
    
    async updateProfile(id: number, dto: UpdateProfilesDto) {
        const profile_id = id;

        await this.profileRepository.update({...dto}, {where: {profile_id}}); 

        return dto;
    }
    
    async removeProfile(id: number) {
        const profile_id = id;

        await this.profileRepository.destroy({where: {profile_id}});

        return {"destroyId": profile_id};
    }
}
