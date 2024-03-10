import { container } from 'tsyringe';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { BooksImagesRepository } from '@modules/books/infra/typeorm/repositories/BooksImagesRepository';
import { BooksRepository } from '@modules/books/infra/typeorm/repositories/BooksRepository';
import { GenresRepository } from '@modules/books/infra/typeorm/repositories/GenresRepository';
import { IBooksImagesRepository } from '@modules/books/repositories/IBooksImagesRepository';
import { IBooksRepository } from '@modules/books/repositories/IBooksRepository';
import { IGenresRepository } from '@modules/books/repositories/IGenresRepository';

container.registerSingleton<IGenresRepository>(
  'GenresRepository',
  GenresRepository,
);

container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IBooksRepository>(
  'BooksRepository',
  BooksRepository,
);

container.registerSingleton<IBooksImagesRepository>(
  'BooksImagesRepository',
  BooksImagesRepository,
);
