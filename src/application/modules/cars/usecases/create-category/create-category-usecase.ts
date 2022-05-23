import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { UseCase } from '@application/contracts/usecase';
import {
  ICreateCategoryRequestDTO,
  ICreateCategoryResponseDTO,
} from '../../dtos/create-category-dtos';
import { ICategoriesRepository } from '../../repositories/contracts/categories-repository';

@injectable()
class CreateCategoryUseCase extends UseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {
    super();
  }

  async perform(
    data: ICreateCategoryRequestDTO,
  ): Promise<ICreateCategoryResponseDTO> {
    const { name } = data;

    const categoryExists = await this.categoriesRepository.findByName(name);

    if (categoryExists) {
      throw new Error('Category already exists');
    }

    const category = await this.categoriesRepository.create({ name });

    return category;
  }
}

export { CreateCategoryUseCase };
