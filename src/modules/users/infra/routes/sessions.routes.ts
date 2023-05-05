import {Router} from 'express';
import {celebrate, Segments, Joi} from 'celebrate';
import AuthenticateUserController from '../controllers/AuthenticateUserController';
import {AuthenticateProviderController} from '../controllers/AuthenticateProviderController';

const sessionsRouter = Router();
const sessionsController = new AuthenticateUserController();
const providerSessionsController = new AuthenticateProviderController()

sessionsRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		},
	}),
	sessionsController.create,
);

sessionsRouter.post(
	'/provider',
	celebrate({
		[Segments.BODY]: {
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		},
	}),
	providerSessionsController.handle,
);


export default sessionsRouter;

