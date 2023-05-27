import { ICostumers } from "../models/ICostumers";

export interface ICostumersRepository {
    findByName(name: string): Promise<ICostumers | undefined>;
    findById(id: string): Promise<ICostumers | undefined>;
    findByEmail(email: string): Promise<ICostumers | undefined>;
}