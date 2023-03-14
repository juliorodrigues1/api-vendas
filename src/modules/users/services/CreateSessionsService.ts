import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { User } from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";

interface IRequest{
    email: string;
    password: string;
}

export class CreateSessionsService{
    public async execute({email, password}: IRequest): Promise<User>{
        const userRespository = getCustomRepository(UsersRepository);

        const user = await userRespository.findByEmail(email);

        if(!user){
            throw new AppError("Incorrect email/password combination.", 401);
        }

        const passwordConfirmed = await compare(password, user.password);

        if(!passwordConfirmed){
            throw new AppError("Incorrect email/password combination.", 401);
        }

        return user;

    }
}