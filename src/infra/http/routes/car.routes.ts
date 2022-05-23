import { CreateCarController } from '@application/modules/cars/usecases/create-car/create-car-controller';
import { Router } from 'express';
import ensureAuthenticateMiddleware from '../middlewares/ensure-authenticate-middleware';

const carsRoutes = Router();
const createCarController = new CreateCarController();

carsRoutes.post('/', ensureAuthenticateMiddleware, createCarController.handle);

export { carsRoutes };
