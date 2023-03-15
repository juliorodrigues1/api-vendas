import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { User } from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";

interface IRequest{
    email: string;
    password: string;
}

interface IResponse{
    user: User;
    token: string;
}

export class CreateSessionsService{
    public async execute({email, password}: IRequest): Promise<IResponse>{
        const userRespository = getCustomRepository(UsersRepository);

        const user = await userRespository.findByEmail(email);

        if(!user){
            throw new AppError("Incorrect email/password combination.", 401);
        }

        const passwordConfirmed = await compare(password, user.password);

        if(!passwordConfirmed){
            throw new AppError("Incorrect email/password combination.", 401);
        }

        const token = sign({}, "64625d5f3096b8b9d06232e0731b3653", {
            subject: user.id,
            expiresIn: "1d"
        });

        return {
            user,
            token
        };

    }
}