import { UseCase } from '@application/contracts/usecase';
import {
  ICreateCarRequestDTO,
  ICreateCarResponseDTO,
} from '../../dtos/create-car-dtos';
import { ICarsRepository } from '../../repositories/contracts/cars-repository';
import { ICategoriesRepository } from '../../repositories/contracts/categories-repository';

class CreateCarUseCase extends UseCase {
  constructor(
    private carsRepository: ICarsRepository,
    private categoriesRepository: ICategoriesRepository,
  ) {
    super();
  }

  async perform(data: ICreateCarRequestDTO): Promise<ICreateCarResponseDTO> {
    const { name, description, brand, user_id, category_id } = data;

    const categoryExists = this.categoriesRepository.findById(category_id);

    if (!categoryExists) {
      throw new Error('Category is not find!');
    }

    const car = await this.carsRepository.create({
      name,
      description,
      brand,
      category_id,
      user_id,
    });

    return car;
  }
}

export { CreateCarUseCase };
