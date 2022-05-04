import { CategoriesRepositoryInMemory } from '@application/modules/cars/repositories/in-memory/categories-repository-in-memory';
import { CreateCategoryUseCase } from '@application/modules/cars/usecases/create-category/create-category-usecase';

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe('Create Category UseCase', () => {
  beforeAll(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    );
  });

  it('should be able to create a new Category', async () => {
    const category = {
      name: 'valid_category',
    };

    const newCategory = await createCategoryUseCase.execute(category);

    expect(newCategory).toHaveProperty('id');
  });
});
