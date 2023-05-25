import { ShowProfileService } from "@modules/users/services/ShowProfileService";
import { UpdateProfileService } from "@modules/users/services/UpdateProfileService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class profileController{


    public async showProfile(request:Request, response: Response): Promise<Response>{
        const showProfle = container.resolve(ShowProfileService);
        const user_id = request.user.id;

        const user = await showProfle.execute({user_id});

        return response.json(user);

    }

    public async updateProfile(request:Request, response: Response): Promise<Response>{
        const user_id = request.user.id;
        const {name, email, password, old_password} = request.body;

        const updateProfile = container.resolve(UpdateProfileService);

        const user = await updateProfile.execute({
            user_id, 
            name,
            email,
            password, 
            old_password
        });

        return response.json(user);

    }
}