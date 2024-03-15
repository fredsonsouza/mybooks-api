import { ICreateBookDTO } from '@modules/orders/dtos/ICreateBookDTO';
import { Order } from '@modules/orders/infra/typeorm/entities/Order';

import { IOrdersRepository } from '../IOrdersRepository';

class OrdersRepositoryInMemory implements IOrdersRepository {
  async create({
    user_id,
    book_id,
    expected_getBook_date,
  }: ICreateBookDTO): Promise<Order> {
    const order = new Order();

    Object.assign(order, {
      user_id,
      book_id,
      expected_getBook_date,
      start_date: new Date(),
    });
    this.orders.push(order);

    return order;
  }
  orders: Order[] = [];

  async findOpenOrderByBook(book_id: string): Promise<Order> {
    return this.orders.find(
      order => order.book_id === book_id && !order.end_date,
    );
  }
  async findOpenOrderByUser(user_id: string): Promise<Order> {
    return this.orders.find(
      order => order.user_id === user_id && !order.end_date,
    );
  }
}

export { OrdersRepositoryInMemory };
