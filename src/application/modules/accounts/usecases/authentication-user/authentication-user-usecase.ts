import { sign } from 'jsonwebtoken';
import { UseCase } from '@application/contracts/usecase';
import authConfig from '@infra/config/auth-config';
import { IEncryptProvider } from '@infra/container/providers/EncryptProvider/contracts/encrypt-provider';
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

    const token = sign({}, authConfig.token_secret, {
      subject: id,
      expiresIn: authConfig.token_expires_in,
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
