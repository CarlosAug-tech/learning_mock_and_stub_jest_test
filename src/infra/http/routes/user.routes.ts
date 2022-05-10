import { CreateUserController } from '@application/modules/accounts/usecases/create-user/create-user-controller';
import { Router } from 'express';

const usersRoutes = Router();
const createUserController = new CreateUserController();

usersRoutes.post('/', createUserController.handle);

export { usersRoutes };
