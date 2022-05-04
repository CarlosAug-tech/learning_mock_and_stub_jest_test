import { UseCase } from '@application/contracts/usecase';
import {
  ICreateUserRequestDTO,
  ICreateUserResponseDTO,
} from '../../dtos/create-user-dto';
import { IUsersRepository } from '../../repositories/contracts/users-repository';

interface ICreateUserRequest extends ICreateUserRequestDTO {
  confirmPassword: string;
}

class CreateUserUseCase extends UseCase {
  constructor(private usersRepository: IUsersRepository) {
    super();
  }

  async execute(data: ICreateUserRequest): Promise<ICreateUserResponseDTO> {
    const { name, email, password, confirmPassword } = data;

    const user = await this.usersRepository.create({
      name,
      email,
      password,
    });

    return user;
  }
}

export { CreateUserUseCase };
