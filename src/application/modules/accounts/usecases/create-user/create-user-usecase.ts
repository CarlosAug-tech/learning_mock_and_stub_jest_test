import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { UseCase } from '@application/contracts/usecase';
import { IMailProvider } from '@infra/container/providers/MailProvider/contracts/mail-provider';
import { IEncryptProvider } from '@infra/container/providers/EncryptProvider/contracts/encrypt-provider';
import {
  ICreateUserRequestDTO,
  ICreateUserResponseDTO,
} from '../../dtos/create-user-dto';
import { IUsersRepository } from '../../repositories/contracts/users-repository';

interface ICreateUserRequest extends ICreateUserRequestDTO {
  confirmPassword: string;
}

@injectable()
class CreateUserUseCase extends UseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('EtherealMailProvider')
    private etherealMailProvider: IMailProvider,
    @inject('BcryptProvider')
    private bcryptProvider: IEncryptProvider,
  ) {
    super();
  }

  async perform(data: ICreateUserRequest): Promise<ICreateUserResponseDTO> {
    const { name, email, password, confirmPassword } = data;
    const saltHash = 12;

    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new Error('User already exists');
    }

    if (password !== confirmPassword) {
      throw new Error('Password does not match with ConfirmPassword');
    }

    const passwordHash = await this.bcryptProvider.hash(password, saltHash);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    await this.etherealMailProvider.sendMail(
      email,
      'Criação da conta com sucesso!',
      { name, email },
      '',
    );

    return user;
  }
}

export { CreateUserUseCase };
