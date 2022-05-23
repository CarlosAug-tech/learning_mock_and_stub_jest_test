import {
  ICreateCarRequestDTO,
  ICreateCarResponseDTO,
} from '@application/modules/cars/dtos/create-car-dtos';
import { ICarsRepository } from '@application/modules/cars/repositories/contracts/cars-repository';
import { getRepository, Repository } from 'typeorm';
import { Car } from '../entities/car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    description,
    brand,
    category_id,
    user_id,
  }: ICreateCarRequestDTO): Promise<ICreateCarResponseDTO> {
    const car = this.repository.create({
      name,
      description,
      brand,
      category_id,
      user_id,
    });

    await this.repository.save(car);

    return car;
  }
}

export { CarsRepository };
