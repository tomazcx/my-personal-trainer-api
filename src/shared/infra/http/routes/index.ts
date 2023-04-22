import {Router} from 'express';
import usersRouter from 'src/modules/users/infra/routes/users.routes';
import sessionsRouter from 'src/modules/users/infra/routes/sessions.routes';
import profileRouter from 'src/modules/users/infra/routes/profile.routes';
import passwordRouter from 'src/modules/users/infra/routes/password.routes';
import appointmentsRouter from 'src/modules/appointments/infra/routes/appointments.routes';
import providersRouter from 'src/modules/appointments/infra/routes/providers.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/profile', profileRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter)
routes.use('/appointments', appointmentsRouter);
routes.use('/providers', providersRouter);

export default routes;

