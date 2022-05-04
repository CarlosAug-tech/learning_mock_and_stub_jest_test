import { UseCase } from '@application/contracts/usecase';
import {
  ICreateCategoryRequestDTO,
  ICreateCategoryResponseDTO,
} from '../../dtos/create-category-dtos';
import { ICategoriesRepository } from '../../repositories/contracts/categories-repository';

class CreateCategoryUseCase extends UseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {
    super();
  }

  async perform(
    data: ICreateCategoryRequestDTO,
  ): Promise<ICreateCategoryResponseDTO> {
    const { name } = data;

    const categoryExists = this.categoriesRepository.findByName(name);

    if (categoryExists) {
      throw new Error('Category already exists');
    }

    const category = this.categoriesRepository.create({ name });

    return category;
  }
}

export { CreateCategoryUseCase };
