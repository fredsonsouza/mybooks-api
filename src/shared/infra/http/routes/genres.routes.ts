import { Router } from 'express';

import { CreateGenreController } from '@modules/books/useCases/createGenre/CreateGenreController';
import { ListGenresController } from '@modules/books/useCases/ListGenres/ListGenresController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const genresRoutes = Router();
const createGenreController = new CreateGenreController();
const listGenresController = new ListGenresController();

genresRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createGenreController.handle,
);
genresRoutes.get('/', listGenresController.handle);
export { genresRoutes };
