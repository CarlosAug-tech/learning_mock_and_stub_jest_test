import {
  ICreateCategoryRequestDTO,
  ICreateCategoryResponseDTO,
} from '../../dtos/create-category-dtos';

interface ICategoriesRepository {
  create(data: ICreateCategoryRequestDTO): Promise<ICreateCategoryResponseDTO>;
}

export { ICategoriesRepository };
