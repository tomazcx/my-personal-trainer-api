import {Router} from 'express';

import {celebrate, Segments, Joi} from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';
import {ListAllProvidersController} from '../controllers/ListAllProvidersController';
import ListProviderMonthAvailabilityController from '@modules/appointments/infra/controllers/ListProviderMonthAvailabilityController';
import ListProviderDayAvailabilityController from '@modules/appointments/infra/controllers/ListProviderDayAvailabilityController';
import {ShowProviderController} from '../controllers/ShowProviderController';
import {CreateProviderUserController} from '../controllers/CreateProviderUserController';
import {UpdateProviderUserController} from '../controllers/UpdateProviderUserController';
import {ShowProvidersByCategoryController} from '../controllers/ShowProvidersByCategoryController';

const providersRouter = Router();
const listProvidersController = new ListAllProvidersController();
const providerMonthAvailabilityController = new ListProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ListProviderDayAvailabilityController();
const showProviderController = new ShowProviderController()
const showProvidersByCategoryController = new ShowProvidersByCategoryController()
const createProviderController = new CreateProviderUserController()
const updateProviderController = new UpdateProviderUserController()

providersRouter.get('/', listProvidersController.handle);

providersRouter.get(
	'/:provider_id/month-availability',
	ensureAuthenticated,
	celebrate({
		[Segments.PARAMS]: {
			provider_id: Joi.string().uuid().required(),
		},
		[Segments.QUERY]: {
			month: Joi.number().integer().required(),
			year: Joi.number().integer().required()
		}
	}),
	providerMonthAvailabilityController.index,
);
providersRouter.get(
	'/:provider_id/day-availability',
	ensureAuthenticated,
	celebrate({
		[Segments.PARAMS]: {
			provider_id: Joi.string().uuid().required(),
		},
		[Segments.QUERY]: {
			day: Joi.number().integer().required(),
			month: Joi.number().integer().required(),
			year: Joi.number().integer().required()
		}
	}),
	providerDayAvailabilityController.index,
);

providersRouter.get('/:provider_id', celebrate({
	[Segments.PARAMS]: {
		provider_id: Joi.string().uuid().required()
	}
}),
	showProviderController.handle
)

providersRouter.get('/category/:category_id', celebrate({
	[Segments.PARAMS]: {
		category_id: Joi.string().uuid().required()
	}
}),
	showProvidersByCategoryController.handle
)

providersRouter.post('/', celebrate({
	[Segments.BODY]: {
		name: Joi.string().required(),
		email: Joi.string().required().email(),
		password: Joi.string().required(),
		category_id: Joi.string().required().uuid(),
	}
}),
	createProviderController.handle
)

providersRouter.put('/',
	ensureAuthenticated,
	celebrate({
		[Segments.BODY]: {
			description: Joi.string(),
			startHour: Joi.number(),
			endHour: Joi.number(),
			category_id: Joi.string().uuid(),
		}
	}),
	updateProviderController.handle
)





export default providersRouter;
