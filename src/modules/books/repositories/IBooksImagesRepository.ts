import { BookImage } from '../infra/typeorm/entities/BookImage';

interface IBooksImagesRepository {
  create(book_id: string, image_name: string): Promise<BookImage>;
}

export { IBooksImagesRepository };
