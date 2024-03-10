import { BooksRepositoryInMemory } from '@modules/books/repositories/in-memory/BooksRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateBookUseCase } from './CreateBookUseCase';

let createBookUseCase: CreateBookUseCase;
let booksRepositoryInMemory: BooksRepositoryInMemory;

describe('Create Book', () => {
  beforeEach(() => {
    booksRepositoryInMemory = new BooksRepositoryInMemory();
    createBookUseCase = new CreateBookUseCase(booksRepositoryInMemory);
  });
  it('Should be able to create a new book', async () => {
    const car = await createBookUseCase.execute({
      title: 'Title teste',
      genre_id: 'Genre',
    });
    expect(car).toHaveProperty('id');
  });

  it('Should not be able to create a new book with the same title', async () => {
    expect(async () => {
      await createBookUseCase.execute({
        title: 'Title1',
        genre_id: 'Genre',
      });

      await createBookUseCase.execute({
        title: 'Title1',
        genre_id: 'Genre',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to create a new book with available true by default', async () => {
    const book = await createBookUseCase.execute({
      title: 'Book Available',
      genre_id: 'Genre',
    });
    expect(book.available).toBe(true);
  });
});
