import { IUserTokens } from "@modules/users/domain/models/IUserTokens";
import { IUserTokensRepository } from "@modules/users/domain/repositories/IUserTokensRepository";
import { EntityRepository, getRepository, Repository } from "typeorm";
import { UserToken } from "../entities/UserToken";


export class UserTokensRopository implements IUserTokensRepository{

    private ormRepository: Repository<UserToken>;

    constructor(){
        this.ormRepository = getRepository(UserToken);
    }

    public async findByToken(token: string): Promise<IUserTokens | undefined> {
        const userToken = await this.ormRepository.findOne({
            where: { token }
        });

        return userToken;
    }


    public async generate(user_id: string): Promise<IUserTokens> {
        const userToken = await this.ormRepository.create({
            user_id
        });

        return userToken;
    }
}