import { inject, injectable } from 'tsyringe';

import { Book } from '@modules/books/infra/typeorm/entities/Book';
import { IBooksRepository } from '@modules/books/repositories/IBooksRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  title: string;
  genre_id: string;
  quantity: number;
}

@injectable()
class CreateBookUseCase {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) {}

  async execute({ title, genre_id, quantity }: IRequest): Promise<Book> {
    const bookAlreadyExists = await this.booksRepository.findByTitle(title);

    if (bookAlreadyExists) {
      throw new AppError('Book already exists!');
    }

    if (quantity <= 0) {
      throw new AppError('Quantity cannot be less than or equal zero!');
    }
    const book = await this.booksRepository.create({
      title,
      genre_id,
      quantity,
    });

    return book;
  }
}

export { CreateBookUseCase };
