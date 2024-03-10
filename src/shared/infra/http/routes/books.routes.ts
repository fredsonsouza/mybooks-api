import { Router } from 'express';
import multer from 'multer';

import { CreateBookController } from '@modules/books/useCases/CreateBook/CreateBookController';
import { ListAvailableBooksController } from '@modules/books/useCases/listAvailableBooks/ListAvailableBooksController';
import { UploadBookImagesController } from '@modules/books/useCases/uploadBookImages/UploadBookImagesController';

import uploadConfig from '../../../../config/upload';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const booksRouter = Router();
const uploadImageCar = multer(uploadConfig.upload('./tmp/books'));

const createBookController = new CreateBookController();
const listAvailableBooksController = new ListAvailableBooksController();
const uploadBookImagesController = new UploadBookImagesController();

booksRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createBookController.handle,
);

booksRouter.get('/available', listAvailableBooksController.handle);

booksRouter.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  uploadImageCar.array('images'),
  uploadBookImagesController.handle,
);

export { booksRouter };
