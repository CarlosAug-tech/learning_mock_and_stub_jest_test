import { UseCase } from '@application/contracts/usecase';
import {
  ICreateCarRequestDTO,
  ICreateCarResponseDTO,
} from '../../dtos/create-car-dtos';
import { ICarsRepository } from '../../repositories/contracts/cars-repository';

class CreateCarUseCase extends UseCase {
  constructor(private carsRepository: ICarsRepository) {
    super();
  }

  async perform(data: ICreateCarRequestDTO): Promise<ICreateCarResponseDTO> {
    const { name, description, brand, category_id } = data;

    const car = await this.carsRepository.create({
      name,
      description,
      brand,
      category_id,
    });

    return car;
  }
}

export { CreateCarUseCase };
