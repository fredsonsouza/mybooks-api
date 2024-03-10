import { ICreateBookDTO } from '../dtos/ICreateBookDTO';
import { Book } from '../infra/typeorm/entities/Book';

interface IBooksRepository {
  create(data: ICreateBookDTO): Promise<Book>;
  findByTitle(title: string): Promise<Book>;
  findAvailable(title?: string, genre_id?: string): Promise<Book[]>;
}

export { IBooksRepository };
