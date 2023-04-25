import {Router} from 'express';
import usersRouter from '@modules/users/infra/routes/users.routes';
import sessionsRouter from '@modules/users/infra/routes/sessions.routes';
import profileRouter from '@modules/users/infra/routes/profile.routes';
import passwordRouter from '@modules/users/infra/routes/password.routes';
import appointmentsRouter from '@modules/appointments/infra/routes/appointments.routes';
import providersRouter from '@modules/appointments/infra/routes/providers.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/profile', profileRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter)
routes.use('/appointments', appointmentsRouter);
routes.use('/providers', providersRouter);

export default routes;

