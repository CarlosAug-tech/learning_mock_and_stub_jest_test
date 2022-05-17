import { UseCase } from '@application/contracts/usecase';
import { IEncryptProvider } from '@infra/container/providers/EncryptProvider/contracts/encrypt-provider';
import { sign } from 'jsonwebtoken';
import {
  IAuthenticationUserRequestDTO,
  IAuthenticationUserResponseDTO,
} from '../../dtos/authentication-user-dto';
import { IUsersRepository } from '../../repositories/contracts/users-repository';

class AuthenticationUserUseCase extends UseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private bcryptProvider: IEncryptProvider,
  ) {
    super();
  }

  async perform(
    data: IAuthenticationUserRequestDTO,
  ): Promise<IAuthenticationUserResponseDTO> {
    const { email, password } = data;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error('User or password invalid!');
    }

    const isPasswordMatch = await this.bcryptProvider.compare(
      password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new Error('User or password invalid!');
    }

    const { id } = user;

    const token = sign({}, '167014c755dc5ad2247e86cbf74ae1c3', {
      subject: id,
    });

    return {
      user: {
        id,
        email,
      },
      token,
    };
  }
}

export { AuthenticationUserUseCase };
