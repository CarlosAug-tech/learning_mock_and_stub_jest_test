import {
  ICreateUserRequestDTO,
  ICreateUserResponseDTO,
} from '@application/modules/accounts/dtos/create-user-dto';
import { IUsersRepository } from '@application/modules/accounts/repositories/contracts/users-repository';
import { AuthenticationUserUseCase } from '@application/modules/accounts/usecases/authentication-user/authentication-user-usecase';
import { IUser } from '@domain/entities/user';
import { IEncryptProvider } from '@infra/container/providers/EncryptProvider/contracts/encrypt-provider';

const makeUsersRepositoryStub = (): IUsersRepository => {
  class UsersRepositoryStub implements IUsersRepository {
    create(data: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
      throw new Error('Method not implemented.');
    }

    findByEmail(email: string): Promise<IUser> {
      const user = {
        id: 'any_uuid',
        name: 'any_name',
        email: 'valid_email@mail.com',
        password: 'valid_password_hashed',
        created_at: new Date(),
      };

      return new Promise(resolve => resolve(user));
    }
  }

  return new UsersRepositoryStub();
};

const makeBcryptProviderStub = (): IEncryptProvider => {
  class BcryptProviderStub implements IEncryptProvider {
    hash(password: string, salt: number): Promise<string> {
      throw new Error('Method not implemented.');
    }

    compare(password: string, password_hash: string): Promise<boolean> {
      return new Promise(resolve => resolve(true));
    }
  }

  return new BcryptProviderStub();
};

interface ISutTypes {
  sut: AuthenticationUserUseCase;
  usersRepositoryStub: IUsersRepository;
  bcryptProviderStub: IEncryptProvider;
}

const makeSut = (): ISutTypes => {
  const usersRepositoryStub = makeUsersRepositoryStub();
  const bcryptProviderStub = makeBcryptProviderStub();
  const sut = new AuthenticationUserUseCase(
    usersRepositoryStub,
    bcryptProviderStub,
  );

  return {
    sut,
    usersRepositoryStub,
    bcryptProviderStub,
  };
};

describe('Authentication User UseCase', () => {
  it('should not be able to authenticate a user if email is invalid', async () => {
    const { sut, usersRepositoryStub } = makeSut();
    jest
      .spyOn(usersRepositoryStub, 'findByEmail')
      .mockReturnValueOnce(undefined);

    await expect(
      sut.execute({
        email: 'valid_email@mail.com',
        password: 'valid_password',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to authenticate user if password is invalid', async () => {
    const { sut, bcryptProviderStub } = makeSut();
    jest
      .spyOn(bcryptProviderStub, 'compare')
      .mockReturnValueOnce(new Promise(resolve => resolve(false)));

    await expect(
      sut.execute({
        email: 'valid_email@mail.com',
        password: 'valid_password',
      }),
    ).rejects.toThrow();
  });

  it('should be able to authenticate a user', async () => {
    const { sut } = makeSut();

    const session = await sut.execute({
      email: 'valid_email@mail.com',
      password: 'valid_password',
    });

    expect(session).toHaveProperty('token');
    expect(session.user).toEqual({
      id: 'any_uuid',
      email: 'valid_email@mail.com',
    });
  });
});
