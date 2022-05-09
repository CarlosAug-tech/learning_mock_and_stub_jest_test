import {
  ICreateUserRequestDTO,
  ICreateUserResponseDTO,
} from '@application/modules/accounts/dtos/create-user-dto';
import { IUsersRepository } from '@application/modules/accounts/repositories/contracts/users-repository';
import { CreateUserUseCase } from '@application/modules/accounts/usecases/create-user/create-user-usecase';
import { IUser } from '@domain/entities/user';
import {
  IMailProvider,
  IMailProviderResponse,
} from '@infra/container/providers/MailProvider/contracts/mail-provider';

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

    async findByEmail(email: string): Promise<IUser> {
      const userFake = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email_exists@mail.com',
        password: 'valid_password',
        created_at: new Date(),
      };

      return new Promise(resolve => resolve(userFake));
    }
  }

  return new UsersRepositoryInMemoryStub();
};

const makeEtherealMailProviderStub = (): IMailProvider => {
  class EtherealMailProviderStub implements IMailProvider {
    async sendMail(
      to: string,
      subject: string,
      variables: any,
      path: string,
    ): Promise<IMailProviderResponse> {
      const mailFake = {
        to: 'any_email@mail.com',
        subject: 'any_subject',
        from: 'user_test_mock@noreply.com',
      };

      return new Promise(resolve => resolve(mailFake));
    }
  }

  return new EtherealMailProviderStub();
};

interface ISutTypes {
  sut: CreateUserUseCase;
  usersRepositoryInMemoryStub: IUsersRepository;
  etherealMailProviderStub: IMailProvider;
}

const makeSut = (): ISutTypes => {
  const usersRepositoryInMemoryStub = makeUsersRepositoryInMemory();
  const etherealMailProviderStub = makeEtherealMailProviderStub();
  const sut = new CreateUserUseCase(
    usersRepositoryInMemoryStub,
    etherealMailProviderStub,
  );
  return {
    sut,
    usersRepositoryInMemoryStub,
    etherealMailProviderStub,
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

  it('should not be able to create a new User if Email already exists', async () => {
    const { sut } = makeSut();

    const user = {
      name: 'valid_name',
      email: 'valid_email_exists@mail.com',
      password: 'valid_password',
      confirmPassword: 'valid_password',
    };

    await expect(sut.execute(user)).rejects.toThrow();
  });

  it('should not be able to create a new User if Password does not match with ConfirmPassword', async () => {
    const { sut, usersRepositoryInMemoryStub } = makeSut();
    jest
      .spyOn(usersRepositoryInMemoryStub, 'findByEmail')
      .mockReturnValueOnce(undefined);

    const user = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
      confirmPassword: 'invalid_password',
    };

    await expect(sut.execute(user)).rejects.toThrow();
  });

  it('should be able to create a new User', async () => {
    const { sut, usersRepositoryInMemoryStub } = makeSut();
    jest
      .spyOn(usersRepositoryInMemoryStub, 'findByEmail')
      .mockReturnValueOnce(undefined);
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
