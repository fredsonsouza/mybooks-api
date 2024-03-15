import { ICreateBookDTO } from '../dtos/ICreateBookDTO';
import { Order } from '../infra/typeorm/entities/Order';

interface IOrdersRepository {
  findOpenOrderByBook(book_id: string): Promise<Order>;
  findOpenOrderByUser(user_id: string): Promise<Order>;
  create(data: ICreateBookDTO): Promise<Order>;
}

export { IOrdersRepository };
