import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCarUseCase } from './create-car-usecase';

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, brand, category_id } = request.body;
    const { id: user_id } = request.user;

    const createCarUseCase = container.resolve(CreateCarUseCase);

    const car = await createCarUseCase.execute({
      name,
      description,
      brand,
      category_id,
      user_id,
    });

    return response.status(201).json(car);
  }
}

export { CreateCarController };
