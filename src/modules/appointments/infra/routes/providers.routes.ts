import {Router} from 'express';

import {celebrate, Segments, Joi} from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';
import ListProvidersController from '../controllers/ListProvidersController';
import ListProviderMonthAvailabilityController from '../controllers/ListProviderMonthAvailabilityController';
import ListProviderDayAvailabilityController from '../controllers/ListProviderDayAvailabilityController';

const providersRouter = Router();
const providersController = new ListProvidersController();
const providerMonthAvailabilityController = new ListProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ListProviderDayAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

providersRouter.get(
	'/:provider_id/month-availability',
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



export default providersRouter;
