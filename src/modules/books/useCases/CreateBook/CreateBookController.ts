import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateBookUseCase } from './CreateBookUseCase';

class CreateBookController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, genre_id } = request.body;
    const createBookUseCase = container.resolve(CreateBookUseCase);

    const book = await createBookUseCase.execute({ title, genre_id });

    return response.status(201).send(book);
  }
}

export { CreateBookController };
