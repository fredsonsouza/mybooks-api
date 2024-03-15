import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateOrderUseCase } from './CreateOrderUseCase';

class CreateOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { expected_getBook_date, book_id } = request.body;
    const { id } = request.user;

    const createOrderRentalUseCase = container.resolve(CreateOrderUseCase);

    const order = await createOrderRentalUseCase.execute({
      expected_getBook_date,
      book_id,
      user_id: id,
    });

    return response.status(201).send(order);
  }
}

export { CreateOrderController };
