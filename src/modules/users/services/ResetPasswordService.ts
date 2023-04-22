import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../infra/typeorm/repositories/UsersRepository";
import { UserTokensRopository } from "../infra/typeorm/repositories/UserTokensRepository";
import AppError from "@shared/errors/AppError";
import { isAfter, addHours } from 'date-fns';
import { hash } from "bcryptjs";

interface IRequest {
    token: string;
    password: string;
}

export class ResetPasswordService {
    async execute({ token, password }: IRequest): Promise<void> {
        const userRepository = getCustomRepository(UsersRepository);
        const userTokenRepository = getCustomRepository(UserTokensRopository);

        const userToken = await userTokenRepository.findByToken(token);

        if (!userToken) {
            throw new AppError("User token does not exists");
        }

        const user = await userRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError("User does not exists");
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError("Token expired");
        }

        user.password = await hash(password, 8);
        userRepository.save(user);


    }
}