import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import {injectable, inject} from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
	email: string;
}

@injectable()
class SendForgotPasswordEmailService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('MailProvider')
		private mailProvider: IMailProvider,

		@inject('UserTokensRepository')
		private userTokenRepository: IUserTokensRepository,
	) {}

	public async execute({email}: IRequest): Promise<void> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) throw new AppError('User does not exists.');

		const {token} = await this.userTokenRepository.generate(user.id);

		await this.mailProvider.sendMail({
			to: {
				name: user.name,
				email: user.email,
			},
			subject: '[MyPersonalTrainer] Recuperação de senha',
			token
		});
	}
}

export default SendForgotPasswordEmailService;

