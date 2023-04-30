import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { User } from "../infra/typeorm/entities/User";
import { UsersRepository } from "../infra/typeorm/repositories/UsersRepository";

@injectable()
export class ListUserService{

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ){}

    public async execute(): Promise<User[]>{

        const users = await this.usersRepository.find();

        return users;

    }
}