import { Repository } from 'typeorm';

import { ICreateBookDTO } from '@modules/books/dtos/ICreateBookDTO';
import { IBooksRepository } from '@modules/books/repositories/IBooksRepository';
import { dataSource } from '@shared/infra/typeorm/data-source';

import { Book } from '../entities/Book';

class BooksRepository implements IBooksRepository {
  private repository: Repository<Book>;

  constructor() {
    this.repository = dataSource.getRepository(Book);
  }

  async create({ title, genre_id }: ICreateBookDTO): Promise<Book> {
    const book = this.repository.create({
      title,
      genre_id,
    });

    await this.repository.save(book);
    return book;
  }
  async findByTitle(title: string): Promise<Book> {
    const book = await this.repository.findOneBy({ title });

    return book;
  }
  async findAvailable(title?: string, genre_id?: string): Promise<Book[]> {
    const booksQuery = await this.repository
      .createQueryBuilder('b')
      .where('available = :available', { available: true });

    if (title) {
      booksQuery.andWhere('b.title = :title', { title });
    }

    if (genre_id) {
      booksQuery.andWhere('b.genre_id = :genre_id', { genre_id });
    }
    const books = await booksQuery.getMany();

    return books;
  }
}
export { BooksRepository };
