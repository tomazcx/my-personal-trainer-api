import {Router} from 'express';
import {celebrate, Segments, Joi} from 'celebrate';
import multer from 'multer';

import CreateUserController from '../controllers/CreateUserController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from 'src/config/upload'
import UpdateUserAvatarController from '../controllers/UpdateUserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new CreateUserController();
const userAvatarController = new UpdateUserAvatarController();

usersRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		},
	}),
	usersController.create,
);

usersRouter.patch(
	'/avatar',
	ensureAuthenticated,
	upload.single('avatar'),
	userAvatarController.update,
);

export default usersRouter;

