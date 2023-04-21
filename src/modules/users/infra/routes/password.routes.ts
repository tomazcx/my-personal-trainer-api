import {Router} from 'express';
import {celebrate, Segments, Joi} from 'celebrate';
import SendForgotPasswordEmailController from '../controllers/SendForgotPasswordEmailController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new SendForgotPasswordEmailController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
	'/forgot',
	celebrate({
		[Segments.BODY]: {
			email: Joi.string().email().required(),
		},
	}),
	forgotPasswordController.create,
);
passwordRouter.patch(
	'/reset',
	celebrate({
		[Segments.BODY]: {
			token: Joi.string().uuid().required(),
			password: Joi.string().required(),
			password_confirmation: Joi.string().required().valid(Joi.ref('password')),
		},
	}),
	resetPasswordController.create,
);

export default passwordRouter;

