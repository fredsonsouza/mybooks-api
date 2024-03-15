import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterOrderAddColumns1710113047784 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('orders', [
      new TableColumn({
        name: 'start_date',
        type: 'timestamp',
        default: 'now()',
      }),
      new TableColumn({
        name: 'end_date',
        type: 'timestamp',
        isNullable: true,
      }),
      new TableColumn({
        name: 'expected_getBook_date',
        type: 'timestamp',
      }),
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      }),
      new TableColumn({
        name: 'total',
        type: 'numeric',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('orders', [
      'start_date',
      'end_date',
      'expected_getBook_date',
      'updated_at',
      'total',
    ]);
  }
}
