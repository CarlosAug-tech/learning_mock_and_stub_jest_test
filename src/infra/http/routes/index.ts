import { Router } from 'express';
import { categoriesRoutes } from './category.routes';
import { usersRoutes } from './user.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/categories', categoriesRoutes);

export { routes };
