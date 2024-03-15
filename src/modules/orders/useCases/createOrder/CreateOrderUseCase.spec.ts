import dayjs from 'dayjs';

import { OrdersRepositoryInMemory } from '@modules/orders/repositories/in-memory/OrdersRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateOrderUseCase } from './CreateOrderUseCase';

let ordersRepositoryInMemory: OrdersRepositoryInMemory;
let createOrderUseCase: CreateOrderUseCase;
let dayJsDateProvider: DayjsDateProvider;

describe('Create order', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    dayJsDateProvider = new DayjsDateProvider();
    ordersRepositoryInMemory = new OrdersRepositoryInMemory();
    createOrderUseCase = new CreateOrderUseCase(
      ordersRepositoryInMemory,
      dayJsDateProvider,
    );
  });

  it('Should be able to create a new order', async () => {
    const order = await createOrderUseCase.execute({
      user_id: '234',
      book_id: '123',
      expected_getBook_date: dayAdd24Hours,
    });

    expect(order).toHaveProperty('id');
    expect(order).toHaveProperty('start_date');
  });

  it('Should be able to create a new order if there is another open to the same user', async () => {
    expect(async () => {
      await createOrderUseCase.execute({
        user_id: '234',
        book_id: '123',
        expected_getBook_date: dayAdd24Hours,
      });

      await createOrderUseCase.execute({
        user_id: '234',
        book_id: '123',
        expected_getBook_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('Should be able to create a new order if there is another open to the same book', async () => {
    expect(async () => {
      await createOrderUseCase.execute({
        user_id: '123',
        book_id: '123',
        expected_getBook_date: dayAdd24Hours,
      });

      await createOrderUseCase.execute({
        user_id: '321',
        book_id: '123',
        expected_getBook_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to create a new order with invalid return time', async () => {
    expect(async () => {
      await createOrderUseCase.execute({
        user_id: '123',
        book_id: '123',
        expected_getBook_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
