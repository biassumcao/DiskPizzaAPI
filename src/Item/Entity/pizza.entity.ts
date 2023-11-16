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
  Id: number;

  @Column()
  Flavor: string;

  @Column({ type: 'double' })
  Price: number;

  @ManyToMany(() => Ingredient, {
    cascade: true,
  })
  @JoinTable({
    name: 'pizzaingredients',
    joinColumn: { name: 'pizzaId', referencedColumnName: 'Id' },
    inverseJoinColumn: { name: 'ingredientId', referencedColumnName: 'Id' },
  })
  Ingredients: Ingredient[];
}
