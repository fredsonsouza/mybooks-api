import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('orders')
class Order {
  @PrimaryColumn()
  id: string;

  @Column()
  book_id: string;

  @Column()
  user_id: string;

  @Column()
  start_date: string;

  @Column()
  end_date: string;

  @Column()
  expected_getBook_date: Date;

  @Column()
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Order };
