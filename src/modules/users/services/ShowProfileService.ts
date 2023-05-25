import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IShowProfile } from "../domain/models/IShowProfile";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { User } from "../infra/typeorm/entities/User";

@injectable()
export class ShowProfileService{

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ){}

    public async execute({user_id} : IShowProfile): Promise<User>{

        const user = await this.usersRepository.findById(user_id);

        if(!user){
            throw new AppError('User not found', 204);
        }

        return user;

    }
}