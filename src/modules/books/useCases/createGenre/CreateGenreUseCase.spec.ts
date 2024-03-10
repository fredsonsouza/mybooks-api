import { GenresRepositoryInMemory } from '@modules/books/repositories/in-memory/GenresRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateGenreUseCase } from './CreateGenreUseCase';

let createGenreUseCase: CreateGenreUseCase;
let genreRepositoryInMemory: GenresRepositoryInMemory;

describe('Create Genre', () => {
  beforeEach(() => {
    genreRepositoryInMemory = new GenresRepositoryInMemory();
    createGenreUseCase = new CreateGenreUseCase(genreRepositoryInMemory);
  });

  it('Should be able to create a new genre', async () => {
    const genre = {
      name: 'Genre Teste',
      description: 'Genre description teste',
    };
    await createGenreUseCase.execute({
      name: genre.name,
      description: genre.description,
    });

    const genreCreated = await genreRepositoryInMemory.findByName(genre.name);

    expect(genreCreated).toHaveProperty('id');
  });

  it('Should not be able to create a new genre with the same name', async () => {
    expect(async () => {
      const genre = {
        name: 'Genre Teste',
        description: 'Genre description teste',
      };

      await createGenreUseCase.execute({
        name: genre.name,
        description: genre.description,
      });

      await createGenreUseCase.execute({
        name: genre.name,
        description: genre.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
