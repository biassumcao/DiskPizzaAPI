import { Pizza } from 'src/Item/Entity/pizza.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  constructor(address: string, paymentMethod: string) {
    this.address = address;
    this.paymentMethod = paymentMethod;
    this.date = new Date();
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  address: string;

  @Column()
  paymentMethod: string;

  @ManyToMany(() => Pizza, {
    cascade: true,
  })
  @JoinTable({
    name: 'orderpizzas',
    joinColumn: { name: 'orderId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'pizzaId', referencedColumnName: 'id' },
  })
  pizzas: Pizza[];
}
