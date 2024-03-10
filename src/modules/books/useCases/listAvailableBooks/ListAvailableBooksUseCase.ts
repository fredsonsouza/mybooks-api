import { inject, injectable } from 'tsyringe';

import { Book } from '@modules/books/infra/typeorm/entities/Book';
import { IBooksRepository } from '@modules/books/repositories/IBooksRepository';

interface IRequest {
  genre_id?: string;
  title?: string;
}
@injectable()
class ListAvailableBooksUseCase {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) {}

  async execute({ genre_id, title }: IRequest): Promise<Book[]> {
    const books = this.booksRepository.findAvailable(title, genre_id);

    return books;
  }
}

export { ListAvailableBooksUseCase };
