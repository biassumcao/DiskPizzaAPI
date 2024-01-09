import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ingredient } from './ingredient.entity';

@Entity()
export class Pizza {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  flavor: string;

  @Column({ type: 'double' })
  price: number;

  @ManyToMany(() => Ingredient, {
    cascade: true,
  })
  @JoinTable({
    name: 'pizzaingredients',
    joinColumn: { name: 'pizzaId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'ingredientId', referencedColumnName: 'id' },
  })
  ingredients: Ingredient[];
}
