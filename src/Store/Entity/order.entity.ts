import { Pizza } from 'src/Item/Entity/pizza.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  constructor(address: string, paymentMethod: string) {
    this.address = address;
    this.paymentMethod = paymentMethod;
  }

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @OneToMany(() => Pizza, (pizza) => pizza.Id)
  @Column()
  pizza: Pizza[];

  @Column()
  address: string;

  @Column()
  paymentMethod: string;
}
