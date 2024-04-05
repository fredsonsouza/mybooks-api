import { inject, injectable } from 'tsyringe';

import { IBooksRepository } from '@modules/books/repositories/IBooksRepository';
import { Order } from '@modules/orders/infra/typeorm/entities/Order';
import { IOrdersRepository } from '@modules/orders/repositories/IOrdersRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  book_id: string;
  user_id: string;
  expected_getBook_date: Date;
}
@injectable()
class CreateOrderUseCase {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) {}
  async execute({
    user_id,
    book_id,
    expected_getBook_date,
  }: IRequest): Promise<Order> {
    const minimumHour = 24;
    const bookUnAvailable =
      await this.ordersRepository.findOpenOrderByBook(book_id);

    if (bookUnAvailable) {
      throw new AppError('Book is Unavailable');
    }
    const orderOpenToUser =
      await this.ordersRepository.findOpenOrderByUser(user_id);

    if (orderOpenToUser) {
      throw new AppError('There is a order in progress for user');
    }
    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_getBook_date,
    );

    if (compare < minimumHour) {
      throw new AppError('Invalid return time');
    }

    const order = await this.ordersRepository.create({
      user_id,
      book_id,
      expected_getBook_date,
    });

    await this.booksRepository.updateQuantity(book_id, 1);
    return order;
  }
}

export { CreateOrderUseCase };
