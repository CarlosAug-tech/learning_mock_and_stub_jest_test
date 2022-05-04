import { IUser } from '@domain/entities/user';
import { User } from '@infra/database/typeorm/entities/user';
import {
  ICreateUserRequestDTO,
  ICreateUserResponseDTO,
} from '../../dtos/create-user-dto';
import { IUsersRepository } from '../contracts/users-repository';

class UsersRepositoryInMemory implements IUsersRepository {
  private user: User[] = [];

  async create({
    name,
    email,
    password,
  }: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
      created_at: new Date(),
    });

    this.user.push(user);

    const { id, created_at } = user;

    return { id, name, email, created_at };
  }

  async findByEmail(email: string): Promise<IUser> {
    return this.user.find(user => user.email === email);
  }
}

export { UsersRepositoryInMemory };
