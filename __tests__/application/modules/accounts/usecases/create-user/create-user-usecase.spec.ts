import {
  ICreateUserRequestDTO,
  ICreateUserResponseDTO,
} from '@application/modules/accounts/dtos/create-user-dto';
import { IUsersRepository } from '@application/modules/accounts/repositories/contracts/users-repository';
import { CreateUserUseCase } from '@application/modules/accounts/usecases/create-user/create-user-usecase';

const makeUsersRepositoryInMemory = (): IUsersRepository => {
  class UsersRepositoryInMemoryStub implements IUsersRepository {
    async create(data: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
      const userFake = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com',
        created_at: new Date(),
      };

      return new Promise(resolve => resolve(userFake));
    }
  }

  return new UsersRepositoryInMemoryStub();
};

interface ISutTypes {
  sut: CreateUserUseCase;
  usersRepositoryInMemoryStub: IUsersRepository;
}

const makeSut = (): ISutTypes => {
  const usersRepositoryInMemoryStub = makeUsersRepositoryInMemory();
  const sut = new CreateUserUseCase(usersRepositoryInMemoryStub);
  return {
    sut,
    usersRepositoryInMemoryStub,
  };
};

describe('Create User UseCase', () => {
  it('should not be able to create a new User if Name field is not provided', async () => {
    const { sut } = makeSut();
    const user = {
      name: '',
      email: 'valid_email@mail.com',
      password: 'valid_password',
      confirmPassword: 'valid_password',
    };

    await expect(sut.execute(user)).rejects.toThrow();
  });

  it('should not be able to create a new User if Email field is not provided', async () => {
    const { sut } = makeSut();
    const user = {
      name: 'valid_name',
      email: '',
      password: 'valid_password',
      confirmPassword: 'valid_password',
    };

    await expect(sut.execute(user)).rejects.toThrow();
  });

  it('should not be able to create a new User if Password field is not provided', async () => {
    const { sut } = makeSut();
    const user = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: '',
      confirmPassword: 'valid_password',
    };

    await expect(sut.execute(user)).rejects.toThrow();
  });

  it('should not be able to create a new User if ConfirmPassword field is not provided', async () => {
    const { sut } = makeSut();
    const user = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
      confirmPassword: '',
    };

    await expect(sut.execute(user)).rejects.toThrow();
  });

  it('should be able to create a new User', async () => {
    const { sut } = makeSut();
    const user = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
      confirmPassword: 'valid_password',
    };

    const newUser = await sut.execute(user);

    expect(newUser).toHaveProperty('id');
    expect(newUser).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@mail.com',
      created_at: newUser.created_at,
    });
  });
});
