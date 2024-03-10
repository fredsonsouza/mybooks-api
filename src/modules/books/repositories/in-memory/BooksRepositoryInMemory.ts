import { ICreateBookDTO } from '@modules/books/dtos/ICreateBookDTO';
import { Book } from '@modules/books/infra/typeorm/entities/Book';

import { IBooksRepository } from '../IBooksRepository';

class BooksRepositoryInMemory implements IBooksRepository {
  books: Book[] = [];

  async create({ title, genre_id }: ICreateBookDTO): Promise<Book> {
    const book = new Book();

    Object.assign(book, {
      title,
      genre_id,
    });

    this.books.push(book);
    return book;
  }

  async findByTitle(title: string): Promise<Book> {
    return this.books.find(book => book.title === title);
  }
  async findAvailable(title?: string, genre_id?: string): Promise<Book[]> {
    const all = this.books.filter(book => {
      if (
        book.available === true ||
        (title && book.title === title) ||
        (genre_id && book.genre_id === genre_id)
      ) {
        return book;
      }
      return null;
    });
    return all;
  }
}

export { BooksRepositoryInMemory };
