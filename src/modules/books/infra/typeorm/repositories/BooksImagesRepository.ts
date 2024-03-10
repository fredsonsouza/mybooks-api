import { Repository } from 'typeorm';

import { IBooksImagesRepository } from '@modules/books/repositories/IBooksImagesRepository';
import { dataSource } from '@shared/infra/typeorm/data-source';

import { BookImage } from '../entities/BookImage';

class BooksImagesRepository implements IBooksImagesRepository {
  private repository: Repository<BookImage>;

  constructor() {
    this.repository = dataSource.getRepository(BookImage);
  }
  async create(book_id: string, image_name: string): Promise<BookImage> {
    const bookImage = this.repository.create({
      book_id,
      image_name,
    });

    await this.repository.save(bookImage);

    return bookImage;
  }
}

export { BooksImagesRepository };
