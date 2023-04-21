import {container} from 'tsyringe';
import './providers';
import UsersRepository from 'src/modules/users/repositories/implementation/UsersRepository';
import IUserTokensRepository from 'src/modules/users/repositories/IUserTokensRepository';
import IUsersRepository from 'src/modules/users/repositories/IUsersRepository';
import UserTokensRepository from 'src/modules/users/repositories/implementation/UserTokensRepository';

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
	'UserTokenRepository',
	UserTokensRepository,
);




