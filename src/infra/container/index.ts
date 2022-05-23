import { container } from 'tsyringe';

import { IUsersRepository } from '@application/modules/accounts/repositories/contracts/users-repository';
import { UsersRepository } from '@infra/database/typeorm/repositories/users-repository';

import { ICategoriesRepository } from '@application/modules/cars/repositories/contracts/categories-repository';
import { CategoriesRepository } from '@infra/database/typeorm/repositories/categories-repository';

import './providers';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);
