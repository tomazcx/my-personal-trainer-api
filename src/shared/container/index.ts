import {container} from 'tsyringe';
import './providers';
import '@modules/users/providers'
import UsersRepository from '@modules/users/repositories/implementation/UsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UserTokensRepository from '@modules/users/repositories/implementation/UserTokensRepository';
import AppointmentsRepository from '@modules/appointments/repositories/infra/AppointmentsRepository';
import NotificationsRepository from '@modules/notifications/repositories/infra/NotificationRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationRepository';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import {IProvidersRepository} from '@modules/providers/repositories/IProvidersRepository';
import {ProvidersRepository} from '@modules/providers/repositories/implementation/ProvidersRepository';
import {ICategoriesRepository} from '@modules/providers/repositories/ICategoriesRepository';
import {CategoriesRepository} from '@modules/providers/repositories/implementation/CategoriesRepository';

container.registerSingleton<IAppointmentsRepository>(
	'AppointmentsRepository',
	AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository,
);

container.registerSingleton<IProvidersRepository>('ProvidersRepository', ProvidersRepository)

container.registerSingleton<IUserTokensRepository>(
	'UserTokensRepository',
	UserTokensRepository,
);

container.registerSingleton<INotificationsRepository>(
	'NotificationsRepository',
	NotificationsRepository,
);

container.registerSingleton<ICategoriesRepository>('CategoriesRepository', CategoriesRepository)




