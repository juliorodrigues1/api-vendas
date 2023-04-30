
import { ICreateUser } from "../models/ICreateUser";
import { IUsers } from "../models/IUsers";

export interface IUsersRepository {
    findByEmail(email: string): Promise<IUsers | undefined>;
    findByName(name: string): Promise<IUsers | undefined>;
    create({ name, email, password} : ICreateUser): Promise<IUsers>;
    save(user: IUsers): Promise<IUsers>;
    findById(id: string): Promise<IUsers | undefined>;
    find(): Promise<IUsers[]>;
}