import { Request, Response } from "express";
import { ResetPasswordService } from "../services/ResetPasswordService";

export class ResetPasswordController {
  
    public async create(req: Request, res: Response): Promise<Response> {
        
        const { password, token } = req.body;

        const resetPasswordService = new ResetPasswordService();

        await resetPasswordService.execute({
            token,
            password
        });


        
        return res.status(204).json({ message: "Reset Password" });
    }
}