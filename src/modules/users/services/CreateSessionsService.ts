import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "@config/auth";
import { ICreateSession } from "../domain/models/ICreateSession";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { IResponseSession } from "../domain/models/IResponseSession";

@injectable()
export class CreateSessionsService{

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ){}

    public async execute({email, password}: ICreateSession): Promise<IResponseSession>{

        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new AppError("Incorrect email/password combination.", 401);
        }

        const passwordConfirmed = await compare(password, user.password);

        if(!passwordConfirmed){
            throw new AppError("Incorrect email/password combination.", 401);
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn
        });

        return {
            user,
            token
        };

    }
}