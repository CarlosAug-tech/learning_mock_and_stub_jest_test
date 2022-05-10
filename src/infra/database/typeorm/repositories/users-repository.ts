import { getRepository, Repository } from 'typeorm';
import {
  ICreateUserRequestDTO,
  ICreateUserResponseDTO,
} from '@application/modules/accounts/dtos/create-user-dto';
import { IUsersRepository } from '@application/modules/accounts/repositories/contracts/users-repository';
import { IUser } from '@domain/entities/user';
import { User } from '../entities/user';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    email,
    password,
  }: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
    const user = this.repository.create({
      name,
      email,
      password,
    });

    await this.repository.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<IUser> {
    const user = await this.repository.findOne({ email });
    return user;
  }
}

export { UsersRepository };
