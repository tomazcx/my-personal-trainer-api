import {container} from 'tsyringe';
import './providers';
import 'src/modules/users/providers'
import UsersRepository from 'src/modules/users/repositories/implementation/UsersRepository';
import IUserTokensRepository from 'src/modules/users/repositories/IUserTokensRepository';
import IUsersRepository from 'src/modules/users/repositories/IUsersRepository';
import UserTokensRepository from 'src/modules/users/repositories/implementation/UserTokensRepository';
import AppointmentsRepository from 'src/modules/appointments/repositories/infra/AppointmentsRepository';
import NotificationsRepository from 'src/modules/notifications/repositories/infra/NotificationRepository';
import INotificationsRepository from 'src/modules/notifications/repositories/INotificationRepository';
import IAppointmentsRepository from 'src/modules/appointments/repositories/IAppointmentsRepository';

container.registerSingleton<IAppointmentsRepository>(
	'AppointmentsRepository',
	AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
	'UserTokensRepository',
	UserTokensRepository,
);

container.registerSingleton<INotificationsRepository>(
	'NotificationsRepository',
	NotificationsRepository,
);




