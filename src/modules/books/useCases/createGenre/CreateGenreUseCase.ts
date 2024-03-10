import { inject, injectable } from 'tsyringe';

import { IGenresRepository } from '@modules/books/repositories/IGenresRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateGenreUseCase {
  constructor(
    @inject('GenresRepository')
    private genresRepositories: IGenresRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const genreAlreadyExists = await this.genresRepositories.findByName(name);

    if (genreAlreadyExists) {
      throw new AppError('Genre Already Exists');
    }

    this.genresRepositories.create({ name, description });
  }
}

export { CreateGenreUseCase };
