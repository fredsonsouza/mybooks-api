import { BooksRepositoryInMemory } from '@modules/books/repositories/in-memory/BooksRepositoryInMemory';

import { ListAvailableBooksUseCase } from './ListAvailableBooksUseCase';

let booksRepositoryInMemory: BooksRepositoryInMemory;

let listAvailableBooksUseCase: ListAvailableBooksUseCase;

describe('List Books', () => {
  beforeEach(() => {
    booksRepositoryInMemory = new BooksRepositoryInMemory();
    listAvailableBooksUseCase = new ListAvailableBooksUseCase(
      booksRepositoryInMemory,
    );
  });

  it('Should be able to list all available books', async () => {
    const book = await booksRepositoryInMemory.create({
      title: 'Title test',
      genre_id: 'genre_id',
    });
    const books = await listAvailableBooksUseCase.execute({});

    expect(books).toEqual([book]);
  });

  it('Should be able to list available book by title', async () => {
    const book = await booksRepositoryInMemory.create({
      title: 'Title test 1',
      genre_id: 'genre_id',
    });
    const books = await listAvailableBooksUseCase.execute({
      title: 'Title test 1',
    });

    expect(books).toEqual([book]);
  });

  it('Should be able to list available book by title', async () => {
    const book = await booksRepositoryInMemory.create({
      title: 'Title test 2',
      genre_id: 'genre_id 2',
    });
    const books = await listAvailableBooksUseCase.execute({
      genre_id: 'genre_id 2',
    });

    console.log(book);

    expect(books).toEqual([book]);
  });
});
