import { inject, injectable } from 'tsyringe';

import { Genre } from '@modules/books/infra/typeorm/entities/Genre';
import { IGenresRepository } from '@modules/books/repositories/IGenresRepository';

@injectable()
class ListGenresUseCase {
  constructor(
    @inject('GenresRepository')
    private genresRepository: IGenresRepository,
  ) {}

  async execute(): Promise<Genre[]> {
    const allGenres = await this.genresRepository.list();

    return allGenres;
  }
}
export { ListGenresUseCase };
