import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListGenresUseCase } from './ListGenresUseCase';

class ListGenresController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listGenresUseCase = container.resolve(ListGenresUseCase);
    const allGenres = await listGenresUseCase.execute();

    return response.json(allGenres);
  }
}
export { ListGenresController };
