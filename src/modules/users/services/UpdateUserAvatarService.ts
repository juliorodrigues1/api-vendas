import AppError from "@shared/errors/AppError";
import path from "path";
import { getCustomRepository } from "typeorm";
import { User } from "../infra/typeorm/entities/User";
import { UsersRepository } from "../infra/typeorm/repositories/UsersRepository";
import uploadConfig from '@config/upload';
import fs from 'fs';
import { IUpdateUserAvatar } from "../domain/models/IUpdateUserAvatar";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateUserAvatarService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: UsersRepository,
    ) { }

    public async execute({ user_id, avatarFileName }: IUpdateUserAvatar): Promise<User> {
  

        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found.');
        }

        if(user.avatar){
            const userAvatarFilePath = path
            .join(uploadConfig.directory, user.avatar);

            const userAvatarFileExists = await fs.
            promises.stat(userAvatarFilePath);

            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFileName;

        await this.usersRepository.save(user);

        return user;
    }
}