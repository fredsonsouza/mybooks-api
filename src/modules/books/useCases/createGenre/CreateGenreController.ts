import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateGenreUseCase } from './CreateGenreUseCase';

class CreateGenreController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    const createGenreUseCase = container.resolve(CreateGenreUseCase);

    await createGenreUseCase.execute({ name, description });

    return response.status(201).send();
  }
}

export { CreateGenreController };
