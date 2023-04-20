import {Router} from 'express';
import {celebrate, Segments, Joi} from 'celebrate';
import AuthenticateUserController from '../controllers/AuthenticateUserController';

const sessionsRouter = Router();
const sessionsController = new AuthenticateUserController();

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

export default sessionsRouter;

