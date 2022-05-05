import {
  ICreateCategoryRequestDTO,
  ICreateCategoryResponseDTO,
} from '@application/modules/cars/dtos/create-category-dtos';
import { ICategoriesRepository } from '@application/modules/cars/repositories/contracts/categories-repository';
import { CreateCategoryUseCase } from '@application/modules/cars/usecases/create-category/create-category-usecase';
import { ICategory } from '@domain/entities/category';

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

    findByName(name: string): Promise<ICategory> {
      const categoryFake = {
        id: 'valid_id',
        name: 'valid_category_exists',
        created_at: new Date(),
      };

      return new Promise(resolve => resolve(categoryFake));
    }

    findById(id: string): Promise<ICategory> {
      throw new Error('Method not implemented.');
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
  it('should not be able to create a new Category if field Name is not provided', async () => {
    const { sut } = makeSut();

    const category = {
      name: '',
    };

    await expect(sut.execute(category)).rejects.toThrow();
  });

  it('should not be able to create a new Category if already a category with same Name', async () => {
    const { sut } = makeSut();

    const category = {
      name: 'valid_category_exists',
    };

    await expect(sut.execute(category)).rejects.toThrow();
  });

  it('should be able to create a new Category', async () => {
    const { sut, categoriesRepositoryStub } = makeSut();
    jest
      .spyOn(categoriesRepositoryStub, 'findByName')
      .mockReturnValueOnce(undefined);

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
