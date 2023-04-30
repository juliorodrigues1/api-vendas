import AppError from "@shared/errors/AppError";
import { UsersRepository } from "../infra/typeorm/repositories/UsersRepository";
import { UserTokensRopository } from "../infra/typeorm/repositories/UserTokensRepository";
import { EtherealMail } from "@config/mail/EtherealMail";
import path from 'path';
import { inject, injectable } from "tsyringe";
import { IForgotPassword } from "../domain/models/IForgotPassword";



@injectable()
export class SendForgotPasswordEmailService{

  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: UserTokensRopository
  ){}

  public async execute({email}: IForgotPassword): Promise<void>{
 
    const user = await this.usersRepository.findByEmail(email);

    if(!user){
      throw new AppError('User does not exists.');
    }

    const {token} = await this.userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
       'views', 
       'forgot_password.hbs'
       );

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API Vendas] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        },
      },
    });


  }
}