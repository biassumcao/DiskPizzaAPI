import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pizza } from 'src/Item/Entity/pizza.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenuService {
  private readonly logger = new Logger(MenuService.name);
  constructor(
    @InjectRepository(Pizza)
    private readonly pizzaRepository: Repository<Pizza>,
  ) {}

  async getMenu() {
    const pizzas = await this.pizzaRepository.find({
      relations: { ingredients: true },
    });

    const menu: MenuItem[] = [];

    pizzas.forEach((item) => {
      menu.push({
        Id: item.id,
        Pizza: item.flavor,
        Preço: item.price,
        Ingredientes: item.ingredients.map((ing) => ing.name),
      });
    });

    return menu;
  }
}

export interface MenuItem {
  Id: number;
  Pizza: string;
  Preço: number;
  Ingredientes: string[];
}
