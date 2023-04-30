import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { ICreateUser } from "../domain/models/ICreateUser";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { User } from "../infra/typeorm/entities/User";


@injectable()
export class CreateUserService{

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ){}

    public async execute({ name, email, password }: ICreateUser): Promise<User>{
        

        const emailExists = await this.usersRepository.findByEmail(email);

        if(emailExists){
            throw new AppError('Email address already used.');
        }

        const hashedPassword = await hash(password, 8);
        const user = this.usersRepository.create({
            name,
            email,
            password: hashedPassword
        });


        return user;

    }
}