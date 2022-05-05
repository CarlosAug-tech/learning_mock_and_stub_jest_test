import {
  ICreateCarRequestDTO,
  ICreateCarResponseDTO,
} from '@application/modules/cars/dtos/create-car-dtos';
import {
  ICreateCategoryRequestDTO,
  ICreateCategoryResponseDTO,
} from '@application/modules/cars/dtos/create-category-dtos';
import { ICarsRepository } from '@application/modules/cars/repositories/contracts/cars-repository';
import { ICategoriesRepository } from '@application/modules/cars/repositories/contracts/categories-repository';
import { CreateCarUseCase } from '@application/modules/cars/usecases/create-car/create-car-usecase';
import { ICategory } from '@domain/entities/category';

const makeCarsRepositoryStub = (): ICarsRepository => {
  class CarsRepositoryStub implements ICarsRepository {
    create(data: ICreateCarRequestDTO): Promise<ICreateCarResponseDTO> {
      const carFake = {
        id: 'any_id',
        name: 'any_name',
        description: 'any_description',
        brand: 'any_brand',
        category_id: 'any_category_id',
        created_at: new Date(),
      };

      return new Promise(resolve => resolve(carFake));
    }
  }

  return new CarsRepositoryStub();
};

const makeCategoriesRepositoryStub = (): ICategoriesRepository => {
  class CategoriesRepositoryStub implements ICategoriesRepository {
    create(
      data: ICreateCategoryRequestDTO,
    ): Promise<ICreateCategoryResponseDTO> {
      throw new Error('Method not implemented.');
    }

    findByName(name: string): Promise<ICategory> {
      throw new Error('Method not implemented.');
    }

    findById(id: string): Promise<ICategory> {
      const categoryFake = {
        id: 'any_id',
        name: 'any_category',
        created_at: new Date(),
      };

      return new Promise(resolve => resolve(categoryFake));
    }
  }

  return new CategoriesRepositoryStub();
};

interface ISutTypes {
  sut: CreateCarUseCase;
  carsRepositoryStub: ICarsRepository;
  categoriesRepositoryStub: ICategoriesRepository;
}

const makeSut = (): ISutTypes => {
  const carsRepositoryStub = makeCarsRepositoryStub();
  const categoriesRepositoryStub = makeCategoriesRepositoryStub();
  const sut = new CreateCarUseCase(
    carsRepositoryStub,
    categoriesRepositoryStub,
  );

  return { sut, carsRepositoryStub, categoriesRepositoryStub };
};

describe('Create Car UseCase', () => {
  it('should not be able to create a new Car if Name field is not provided', async () => {
    const { sut } = makeSut();

    const car = {
      name: '',
      description: 'any_description',
      brand: 'any_brand',
      category_id: 'any_category_id',
    };

    await expect(sut.execute(car)).rejects.toThrow();
  });

  it('should not be able to create a new Car if Description field is not provided', async () => {
    const { sut } = makeSut();

    const car = {
      name: 'any_name',
      description: '',
      brand: 'any_brand',
      category_id: 'any_category_id',
    };

    await expect(sut.execute(car)).rejects.toThrow();
  });

  it('should not be able to create a new Car if Brand field is not provided', async () => {
    const { sut } = makeSut();

    const car = {
      name: 'any_name',
      description: 'any_description',
      brand: '',
      category_id: 'any_category_id',
    };

    await expect(sut.execute(car)).rejects.toThrow();
  });

  it('should not be able to create a new Car if Category_id field is not provided', async () => {
    const { sut } = makeSut();

    const car = {
      name: 'any_name',
      description: 'any_description',
      brand: 'any_brand',
      category_id: '',
    };

    await expect(sut.execute(car)).rejects.toThrow();
  });

  it('should not be able to create a new Car if the Category is invalid or not exists', async () => {
    const { sut, categoriesRepositoryStub } = makeSut();
    jest
      .spyOn(categoriesRepositoryStub, 'findById')
      .mockReturnValueOnce(undefined);

    const car = {
      name: 'any_name',
      description: 'any_description',
      brand: 'any_brand',
      category_id: 'invalid_category',
    };

    await expect(sut.execute(car)).rejects.toThrow();
  });

  it('should able to create a new Car', async () => {
    const { sut } = makeSut();

    const car = {
      name: 'any_name',
      description: 'any_description',
      brand: 'any_brand',
      category_id: 'any_category_id',
    };

    const newCar = await sut.execute(car);

    expect(newCar).toHaveProperty('id');
    expect(newCar).toEqual({
      id: 'any_id',
      name: 'any_name',
      description: 'any_description',
      brand: 'any_brand',
      category_id: 'any_category_id',
      created_at: newCar.created_at,
    });
  });
});
