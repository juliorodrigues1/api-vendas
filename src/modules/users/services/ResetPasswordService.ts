import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../infra/typeorm/repositories/UsersRepository";
import { UserTokensRopository } from "../infra/typeorm/repositories/UserTokensRepository";
import AppError from "@shared/errors/AppError";
import { isAfter, addHours } from 'date-fns';
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

interface IRequest {
    token: string;
    password: string;
}

@injectable()
export class ResetPasswordService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: UsersRepository,
        @inject('UserTokensRepository')
        private userTokensRepository: UserTokensRopository
    ) { }

    async execute({ token, password }: IRequest): Promise<void> {

        const userToken = await this.userTokensRepository.findByToken(token);

        if (!userToken) {
            throw new AppError("User token does not exists");
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError("User does not exists");
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError("Token expired");
        }

        user.password = await hash(password, 8);
        this.usersRepository.save(user);


    }
}