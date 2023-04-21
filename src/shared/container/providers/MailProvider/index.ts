import {container} from 'tsyringe';
import MailProvider from './implementation/MailProvider';
import IMailProvider from './models/IMailProvider';

container.registerSingleton<IMailProvider>(
	'MailProvider',
	MailProvider
);


