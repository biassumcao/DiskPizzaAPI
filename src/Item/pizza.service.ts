import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pizza } from './pizza.entity';
import { Repository } from 'typeorm';
import { GetPizzaDto } from './Dto/get-pizza.do';
import { PizzaDto } from './Dto/pizza.dto';

@Injectable()
export class PizzaService {
  constructor(
    @InjectRepository(Pizza)
    private readonly pizzaRepository: Repository<Pizza>,
  ) {}

  async getPizza(getPizzaDto: GetPizzaDto) {
    const pizza = await this.pizzaRepository.findOne({
      where: { Id: getPizzaDto.id },
    });

    const pizzaDto = new PizzaDto();
    pizzaDto.flavor = pizza.Flavor;
    pizzaDto.ingredients = pizza.Ingredients;
    pizzaDto.price = pizza.Price;

    return pizzaDto;
  }

  async addPizza(pizzaDto: PizzaDto) {
    const pizza = new Pizza();
    pizza.Flavor = pizzaDto.flavor;
    pizza.Ingredients = pizzaDto.ingredients;
    pizza.Price = pizzaDto.price;

    return await this.pizzaRepository.save(pizza);
  }

  async updatePizza(updatePizzaDto) {
    const pizza = await this.pizzaRepository.findOne({
      where: { Id: updatePizzaDto.id },
    });

    return await this.pizzaRepository.save({ ...pizza, ...updatePizzaDto });
  }
  async deletePizza(deletePizzaDto) {
    const pizza = await this.pizzaRepository.findOne(deletePizzaDto.id);

    await this.pizzaRepository.remove(pizza);
  }
}
