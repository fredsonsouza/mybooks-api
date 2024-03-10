import { inject, injectable } from 'tsyringe';

import { IBooksImagesRepository } from '@modules/books/repositories/IBooksImagesRepository';

interface IRequest {
  book_id: string;
  images_name: string[];
}

@injectable()
class UploadBookImagesUseCase {
  constructor(
    @inject('BooksImagesRepository')
    private booksImagesRepository: IBooksImagesRepository,
  ) {}

  async execute({ book_id, images_name }: IRequest): Promise<void> {
    images_name.map(async image => {
      this.booksImagesRepository.create(book_id, image);
    });
  }
}

export { UploadBookImagesUseCase };
