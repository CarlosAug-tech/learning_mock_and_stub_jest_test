import {
  ICreateCarRequestDTO,
  ICreateCarResponseDTO,
} from '@application/modules/cars/dtos/create-car-dtos';
import { ICarsRepository } from '@application/modules/cars/repositories/contracts/cars-repository';
import { CreateCarUseCase } from '@application/modules/cars/usecases/create-car/create-car-usecase';

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

interface ISutTypes {
  sut: CreateCarUseCase;
  carsRepositoryStub: ICarsRepository;
}

const makeSut = (): ISutTypes => {
  const carsRepositoryStub = makeCarsRepositoryStub();
  const sut = new CreateCarUseCase(carsRepositoryStub);

  return { sut, carsRepositoryStub };
};

describe('Create Car UseCase', () => {
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
