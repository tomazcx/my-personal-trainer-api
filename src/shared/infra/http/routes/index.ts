import {Router} from 'express';

import usersRouter from 'src/modules/users/infra/routes/users.routes';
import sessionsRouter from 'src/modules/users/infra/routes/sessions.routes';
import profileRouter from 'src/modules/users/infra/routes/profile.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/profile', profileRouter);
routes.use('/sessions', sessionsRouter);

export default routes;

