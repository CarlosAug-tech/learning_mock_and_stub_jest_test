import { AuthenticationUserController } from '@application/modules/accounts/usecases/authentication-user/authentication-user-controller';
import { Router } from 'express';

const authenticationRoutes = Router();
const authenticationUserController = new AuthenticationUserController();

authenticationRoutes.post('/sessions', authenticationUserController.handle);

export { authenticationRoutes };
