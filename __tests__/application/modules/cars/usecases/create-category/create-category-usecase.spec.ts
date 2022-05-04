import {
  ICreateCategoryRequestDTO,
  ICreateCategoryResponseDTO,
} from '@application/modules/cars/dtos/create-category-dtos';
import { ICategoriesRepository } from '@application/modules/cars/repositories/contracts/categories-repository';
import { CreateCategoryUseCase } from '@application/modules/cars/usecases/create-category/create-category-usecase';

const makeCategoriesRepositoryStub = (): ICategoriesRepository => {
  class CategoriesRepositoryStub implements ICategoriesRepository {
    create(
      data: ICreateCategoryRequestDTO,
    ): Promise<ICreateCategoryResponseDTO> {
      const categoryFake = {
        id: 'valid_id',
        name: 'valid_category',
        created_at: new Date(),
      };

      return new Promise(resolve => resolve(categoryFake));
    }
  }

  return new CategoriesRepositoryStub();
};

interface ISutTypes {
  sut: CreateCategoryUseCase;
  categoriesRepositoryStub: ICategoriesRepository;
}

const makeSut = (): ISutTypes => {
  const categoriesRepositoryStub = makeCategoriesRepositoryStub();
  const sut = new CreateCategoryUseCase(categoriesRepositoryStub);

  return {
    sut,
    categoriesRepositoryStub,
  };
};

describe('Create Category UseCase', () => {
  it('should be able to create a new Category', async () => {
    const { sut } = makeSut();

    const category = {
      name: 'valid_category',
    };

    const newCategory = await sut.execute(category);

    expect(newCategory).toHaveProperty('id');
    expect(newCategory).toEqual({
      id: 'valid_id',
      name: 'valid_category',
      created_at: newCategory.created_at,
    });
  });
});
