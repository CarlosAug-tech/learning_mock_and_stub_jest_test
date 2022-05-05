import { ICategory } from '@domain/entities/category';
import {
  ICreateCategoryRequestDTO,
  ICreateCategoryResponseDTO,
} from '../../dtos/create-category-dtos';

interface ICategoriesRepository {
  create(data: ICreateCategoryRequestDTO): Promise<ICreateCategoryResponseDTO>;
  findByName(name: string): Promise<ICategory>;
  findById(id: string): Promise<ICategory>;
}

export { ICategoriesRepository };
