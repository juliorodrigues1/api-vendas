import { IUsers } from "./IUsers";

export interface IResponseSession {
    user: IUsers;
    token: string;
}