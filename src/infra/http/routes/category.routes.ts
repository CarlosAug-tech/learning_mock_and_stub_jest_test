import { Router } from 'express';
import { CreateCategoryController } from '@application/modules/cars/usecases/create-category/create-category-controller';
import ensureAuthenticateMiddleware from '../middlewares/ensure-authenticate-middleware';

const categoriesRoutes = Router();
const createCategoryController = new CreateCategoryController();

categoriesRoutes.post(
  '/',
  ensureAuthenticateMiddleware,
  createCategoryController.handle,
);

export { categoriesRoutes };
