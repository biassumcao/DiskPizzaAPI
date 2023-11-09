import { ItemDto } from './Item.dto';

export class PizzaDto implements ItemDto {
  name: string;
  price: number;
  flavor: string;
  ingredients: string[];
}
