import { Router } from 'express';

import { CreateOrderController } from '@modules/orders/useCases/createOrder/CreateOrderController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const orderRoutes = Router();

const createOrderController = new CreateOrderController();

orderRoutes.post('/', ensureAuthenticated, createOrderController.handle);

export { orderRoutes };
