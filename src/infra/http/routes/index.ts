import { Router } from 'express';
import { authenticationRoutes } from './authentication.routes';
import { carsRoutes } from './car.routes';
import { categoriesRoutes } from './category.routes';
import { usersRoutes } from './user.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/categories', categoriesRoutes);
routes.use('/cars', carsRoutes);
routes.use(authenticationRoutes);

export { routes };
