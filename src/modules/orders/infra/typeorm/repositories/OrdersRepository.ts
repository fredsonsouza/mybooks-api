import { Repository } from 'typeorm';

import { ICreateBookDTO } from '@modules/orders/dtos/ICreateBookDTO';
import { IOrdersRepository } from '@modules/orders/repositories/IOrdersRepository';
import { dataSource } from '@shared/infra/typeorm/data-source';

import { Order } from '../entities/Order';

class OrdersRepository implements IOrdersRepository {
  private repository: Repository<Order>;

  constructor() {
    this.repository = dataSource.getRepository(Order);
  }

  async findOpenOrderByBook(book_id: string): Promise<Order> {
    const openByBook = await this.repository.findOneBy({ book_id });
    return openByBook;
  }
  async findOpenOrderByUser(user_id: string): Promise<Order> {
    const openByUser = await this.repository.findOneBy({ user_id });
    return openByUser;
  }
  async create({
    book_id,
    user_id,
    expected_getBook_date,
  }: ICreateBookDTO): Promise<Order> {
    const order = this.repository.create({
      book_id,
      user_id,
      expected_getBook_date,
    });

    await this.repository.save(order);
    return order;
  }
}

export { OrdersRepository };
