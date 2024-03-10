import { DataSource } from 'typeorm';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { Book } from '@modules/books/infra/typeorm/entities/Book';
import { BookImage } from '@modules/books/infra/typeorm/entities/BookImage';
import { Genre } from '@modules/books/infra/typeorm/entities/Genre';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'docker',
  password: 'ignite',
  database: 'mybooks',

  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  entities: [Genre, User, Book, BookImage],
});

export function createConnection(
  host = 'database_mybooks',
): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}
