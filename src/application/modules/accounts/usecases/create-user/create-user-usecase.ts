import { UseCase } from '@application/contracts/usecase';
import { IMailProvider } from '@infra/container/providers/MailProvider/contracts/mail-provider';
import {
  ICreateUserRequestDTO,
  ICreateUserResponseDTO,
} from '../../dtos/create-user-dto';
import { IUsersRepository } from '../../repositories/contracts/users-repository';

interface ICreateUserRequest extends ICreateUserRequestDTO {
  confirmPassword: string;
}

class CreateUserUseCase extends UseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private etherealProvider: IMailProvider,
  ) {
    super();
  }

  async perform(data: ICreateUserRequest): Promise<ICreateUserResponseDTO> {
    const { name, email, password, confirmPassword } = data;

    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new Error('User already exists');
    }

    if (password !== confirmPassword) {
      throw new Error('Password does not match with ConfirmPassword');
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password,
    });

    await this.etherealProvider.sendMail(
      email,
      'Criação da conta com sucesso!',
      { name, email },
      '',
    );

    return user;
  }
}

export { CreateUserUseCase };
