import {Request, Response} from 'express';
import {container} from 'tsyringe';
import ListProviderMonthAvailabilityService from '../../services/ListProviderMonthAvailabilityService';

export default class ListProviderMonthAvailabilityController {
	public async index(req: Request, res: Response): Promise<Response> {
		const {provider_id} = req.params;
		const {month, year} = req.query;

		const listProviderMonthAvailability = container.resolve(
			ListProviderMonthAvailabilityService,
		);

		const availability = await listProviderMonthAvailability.execute({
			provider_id,
			month: Number(month),
			year: Number(year),
		});

		return res.status(200).json(availability);
	}
}

