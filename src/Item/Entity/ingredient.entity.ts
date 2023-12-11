import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ingredient {
  constructor(name: string) {
    this.name = name;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
