import { Category } from '@infra/database/typeorm/entities/category';
import {
  ICreateCategoryRequestDTO,
  ICreateCategoryResponseDTO,
} from '../../dtos/create-category-dtos';
import { ICategoriesRepository } from '../contracts/categories-repository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private category: Category[] = [];

  async create({
    name,
  }: ICreateCategoryRequestDTO): Promise<ICreateCategoryResponseDTO> {
    const category = new Category();

    Object.assign(category, {
      name,
      created_at: new Date(),
    });

    this.category.push(category);

    return category;
  }
}

export { CategoriesRepositoryInMemory };
