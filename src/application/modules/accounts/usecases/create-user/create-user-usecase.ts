import { UseCase } from '@application/contracts/usecase';
import { ICreateUserResponseDTO } from '../../dtos/create-user-dto';
import { IUsersRepository } from '../../repositories/contracts/users-repository';

interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
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
