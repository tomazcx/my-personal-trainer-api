import {Router} from 'express';
import {celebrate, Segments, Joi} from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';
import UpdateProfileController from '../controllers/UpdateProfileController';
import ShowProfileController from '../controllers/ShowProfileController';


const profileRouter = Router();
const updateProfileController = new UpdateProfileController();
const showProfileController = new ShowProfileController()

profileRouter.use(ensureAuthenticated);
profileRouter.get('/', showProfileController.show);
profileRouter.put(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			old_password: Joi.string().required(),
			password: Joi.string().required(),
			password_confirmation: Joi.string().required().valid(Joi.ref('password')),
		},
	}),
	updateProfileController.update,
);

export default profileRouter;

