import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pizza {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  Flavor: string;

  @Column()
  Price: number;

  @Column()
  Ingredients: string[];
}
