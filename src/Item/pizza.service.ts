import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pizza } from './Entity/pizza.entity';
import { Repository } from 'typeorm';
import { GetPizzaDto } from './Dto/get-pizza.dto';
import { PizzaDto } from './Dto/pizza.dto';
import { Ingredient } from './Entity/ingredient.entity';

@Injectable()
export class PizzaService {
  constructor(
    @InjectRepository(Pizza)
    private readonly pizzaRepository: Repository<Pizza>,
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async getPizza(getPizzaDto: GetPizzaDto) {
    const pizza = await this.pizzaRepository.findOne({
      where: { Id: getPizzaDto.id },
      relations: { Ingredients: true },
    });
    const pizzaDto = new PizzaDto();
    pizzaDto.flavor = pizza.Flavor;
    pizzaDto.price = pizza.Price;
    pizzaDto.ingredients = [];

    pizza.Ingredients.forEach((ingredient) => {
      pizzaDto.ingredients.push(ingredient.Name);
    });

    return pizzaDto;
  }

  async addPizza(pizzaDto: PizzaDto) {
    const pizza = new Pizza();
    pizza.Flavor = pizzaDto.flavor;
    pizza.Price = pizzaDto.price;

    const ingredients: Ingredient[] = [];

    for (const ingredientName of pizzaDto.ingredients) {
      const ingredient = new Ingredient(ingredientName);
      const savedIngredient = await this.ingredientRepository.save(ingredient);
      ingredients.push(savedIngredient);
    }

    pizza.Ingredients = ingredients;

    await this.pizzaRepository.save(pizza);
    return pizzaDto;
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
