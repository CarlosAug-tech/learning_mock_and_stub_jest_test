import { UsersRepositoryInMemory } from '@application/modules/accounts/repositories/in-memory/users-repository-in-memory';
import { CreateUserUseCase } from '@application/modules/accounts/usecases/create-user/create-user-usecase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Create User UseCase', () => {
  beforeAll(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to create a new User', async () => {
    const user = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
      confirmPassword: 'valid_password',
    };

    const newUser = await createUserUseCase.execute(user);

    expect(newUser).toHaveProperty('id');
    expect(newUser).toEqual({
      id: newUser.id,
      name: 'valid_name',
      email: 'valid_email@mail.com',
      created_at: newUser.created_at,
    });
  });
});
