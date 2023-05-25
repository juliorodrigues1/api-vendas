import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { IUpdateProfile } from "../domain/models/IUpdateProfile";
import { IUsers } from "../domain/models/IUsers";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";

@injectable()
export class UpdatefileService{

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ){}

    public async execute({user_id, name, email, password, old_password} : IUpdateProfile): Promise<IUsers>{

        const user = await this.usersRepository.findById(user_id);

        if(!user){
            throw new AppError('User not found', 204);
        }

        const userUpdateEmail = await this.usersRepository.findByEmail(email);

        if(userUpdateEmail && userUpdateEmail.id !== user_id){
            throw new AppError('Email already in use');
        }

        if(password && !old_password){
            throw new AppError('Old password is required');
        }

        if(password && old_password){
            const checkOldPassword = await compare(old_password, user.password);

            if(!checkOldPassword){
                throw new AppError('Old password does not match');
            }

            user.password = await hash(password, 8);
        
        }

        user.name = name
        user.email = email;
        
        this.usersRepository.save(user);

        return user;

    }
}