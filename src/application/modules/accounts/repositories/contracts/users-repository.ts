import {
  ICreateUserRequestDTO,
  ICreateUserResponseDTO,
} from '../../dtos/create-user-dto';

interface IUsersRepository {
  create(data: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO>;
}

export { IUsersRepository };
