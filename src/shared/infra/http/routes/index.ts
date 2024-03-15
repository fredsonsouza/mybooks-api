import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { booksRouter } from './books.routes';
import { genresRoutes } from './genres.routes';
import { orderRoutes } from './orders.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/genres', genresRoutes);

router.use('/users', usersRoutes);

router.use('/books', booksRouter);

router.use('/orders', orderRoutes);

router.use(authenticateRoutes);

export { router };
