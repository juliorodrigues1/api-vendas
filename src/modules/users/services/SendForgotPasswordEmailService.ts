import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import { UserTokensRopository } from "../typeorm/repositories/UserTokensRepository";
import { EtherealMail } from "@config/mail/EtherealMail";

interface IRequest{
  email: string;
}

export class SendForgotPasswordEmailService{
  public async execute({email}: IRequest): Promise<void>{
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokensRopository);
    const user = await usersRepository.findByEmail(email);

    if(!user){
      throw new AppError('User does not exists.');
    }

    const {token} = await userTokenRepository.generate(user.id);


    // console.log(token);

    await EtherealMail.sendMail({
      to: user.email,
      body: `[API Vendas] Recuperação de senha - ${token}`,
    });


  }
}