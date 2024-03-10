import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailableBooksUseCase } from './ListAvailableBooksUseCase';

class ListAvailableBooksController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, genre_id } = request.query;

    const listAvailableBooksUseCase = container.resolve(
      ListAvailableBooksUseCase,
    );

    const books = await listAvailableBooksUseCase.execute({
      title: title as string,
      genre_id: genre_id as string,
    });

    return response.json(books);
  }
}

export { ListAvailableBooksController };
