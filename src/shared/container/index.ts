import {container} from 'tsyringe';

import 'src/modules/users/providers';
import './providers';
import UsersRepository from 'src/modules/users/repositories/implementation/UsersRepository';
import UserTokensRepository from 'src/modules/users/services/SendForgotPasswordEmailService';
import IUserTokensRepository from 'src/modules/users/repositories/IUserTokensRepository';
import IUsersRepository from 'src/modules/users/repositories/IUsersRepository';

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
	'UserTokenRepository',
	UserTokensRepository,
);


