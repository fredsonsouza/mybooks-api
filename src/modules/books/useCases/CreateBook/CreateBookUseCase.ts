import { inject, injectable } from 'tsyringe';

import { Book } from '@modules/books/infra/typeorm/entities/Book';
import { IBooksRepository } from '@modules/books/repositories/IBooksRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  title: string;
  genre_id: string;
}

@injectable()
class CreateBookUseCase {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) {}

  async execute({ title, genre_id }: IRequest): Promise<Book> {
    const bookAlreadyExists = await this.booksRepository.findByTitle(title);

    if (bookAlreadyExists) {
      throw new AppError('Book already exists!');
    }
    const book = await this.booksRepository.create({
      title,
      genre_id,
    });

    return book;
  }
}

export { CreateBookUseCase };
