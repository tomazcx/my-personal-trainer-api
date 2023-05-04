import {Router} from 'express';
import {celebrate, Segments, Joi} from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';
import CreateAppointmentController from '../controllers/CreateAppointmentController';
import ListProviderAppointmentsController from '../controllers/ListProviderAppointmentsController';
import {ListClientAppointmentsController} from '../controllers/ListClientAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new CreateAppointmentController();
const providerAppointmentsController = new ListProviderAppointmentsController()
const listClientAppointmentsController = new ListClientAppointmentsController()

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			provider_id: Joi.string().uuid().required(),
			date: Joi.date().required(),
		},
	}),
	appointmentsController.create,
);

appointmentsRouter.get('/me',
	celebrate({
		[Segments.QUERY]: {
			day: Joi.number().integer().required(),
			month: Joi.number().integer().required(),
			year: Joi.number().integer().required()
		}
	}),
	providerAppointmentsController.index);

appointmentsRouter.get('/client/me', listClientAppointmentsController.handle)

export default appointmentsRouter;
