import {
  ICreateCarRequestDTO,
  ICreateCarResponseDTO,
} from '../../dtos/create-car-dtos';

interface ICarsRepository {
  create(data: ICreateCarRequestDTO): Promise<ICreateCarResponseDTO>;
}

export { ICarsRepository };
