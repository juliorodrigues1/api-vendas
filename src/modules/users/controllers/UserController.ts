import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";
import { ListUserService } from "../services/ListUserService";

export class UserController{
    public async index(req: Request, res: Response): Promise<Response>{
        const listUsers = new ListUserService();
        const users = await listUsers.execute();
        return res.json(users);
    }

    public async create(req: Request, res: Response): Promise<Response>{
        const { name, email, password } = req.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password
        });

        return res.json(user);
    }
}