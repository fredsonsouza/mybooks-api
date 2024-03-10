import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadBookImagesUseCase } from './UploadBookImagesUseCase';

interface IFiles {
  filename: string;
}

class UploadBookImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];

    const uploadBookImagesUseCase = container.resolve(UploadBookImagesUseCase);

    const images_name = images.map(file => file.filename);

    await uploadBookImagesUseCase.execute({
      book_id: id,
      images_name,
    });

    return response.status(201).send();
  }
}

export { UploadBookImagesController };
