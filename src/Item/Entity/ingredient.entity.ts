import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ingredient {
  constructor(name: string) {
    this.Name = name;
  }

  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  Name: string;
}
