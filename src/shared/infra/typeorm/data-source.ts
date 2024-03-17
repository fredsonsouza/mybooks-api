import { DataSource } from 'typeorm';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { Book } from '@modules/books/infra/typeorm/entities/Book';
import { BookImage } from '@modules/books/infra/typeorm/entities/BookImage';
import { Genre } from '@modules/books/infra/typeorm/entities/Genre';
import { Order } from '@modules/orders/infra/typeorm/entities/Order';

export const dataSource = new DataSource({
  type: 'postgres',
  database: process.env.NODE_ENV === 'test' ? 'mybooks_test' : 'mybooks',
  host: 'localhost',
  port: 5432,
  username: 'docker',
  password: 'ignite',
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  entities: [Genre, User, Book, BookImage, Order],
});

export function createConnection(
  host = 'database_mybooks',
): Promise<DataSource> {
  return dataSource
    .setOptions({ host: process.env.NODE_ENV === 'test' ? 'localhost' : host })
    .initialize();
}
