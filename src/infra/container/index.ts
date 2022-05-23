import { container } from 'tsyringe';

import { IUsersRepository } from '@application/modules/accounts/repositories/contracts/users-repository';
import { UsersRepository } from '@infra/database/typeorm/repositories/users-repository';

import { ICategoriesRepository } from '@application/modules/cars/repositories/contracts/categories-repository';
import { CategoriesRepository } from '@infra/database/typeorm/repositories/categories-repository';

import { ICarsRepository } from '@application/modules/cars/repositories/contracts/cars-repository';
import { CarsRepository } from '@infra/database/typeorm/repositories/cars-repository';

import './providers';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);
