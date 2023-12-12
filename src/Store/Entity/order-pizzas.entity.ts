import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('orderpizzas')
export class OrderPizzas {
  @PrimaryColumn()
  pizzaId: number;

  @PrimaryColumn()
  orderId: number;

  @Column({ default: 0 })
  amount: number = 0;
}
