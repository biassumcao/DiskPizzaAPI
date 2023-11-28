import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pizza } from './Entity/pizza.entity';
import { Repository } from 'typeorm';
import { GetPizzaDto } from './Dto/get-pizza.dto';
import { PizzaDto } from './Dto/pizza.dto';
import { Ingredient } from './Entity/ingredient.entity';
import { UpdatePizzaDto } from './Dto/update-pizza.dto';
import { DeletePizzaDto } from './Dto/delete-pizza.dto';
import { AppErrors } from './app-errors';

@Injectable()
export class PizzaService {
  private readonly logger = new Logger(PizzaService.name);

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

    if (!pizza) {
      throw new Error(`Not found pizza with id ${getPizzaDto.id}`);
    }
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
    try {
      const pizza = new Pizza();
      pizza.Flavor = pizzaDto.flavor;
      pizza.Price = pizzaDto.price;

      const ingredients: Ingredient[] = [];

      for (const ingredientName of pizzaDto.ingredients) {
        const ingredient = new Ingredient(ingredientName);
        const savedIngredient =
          await this.ingredientRepository.save(ingredient);
        ingredients.push(savedIngredient);
      }

      pizza.Ingredients = ingredients;

      await this.pizzaRepository.save(pizza);
      return pizzaDto;
    } catch (error) {
      this.formatError(error.message);
    }
  }

  async updatePizza(updatePizzaDto: UpdatePizzaDto): Promise<string> {
    const updateResult = await this.pizzaRepository.update(updatePizzaDto.id, {
      Id: updatePizzaDto.id,
      Flavor: updatePizzaDto.flavor,
      Price: updatePizzaDto.price,
    });

    if (updateResult.affected == 0) {
      throw new Error(`Not found pizza with id ${updatePizzaDto.id} to update`);
    }

    return `Pizza ${updatePizzaDto.id} updated succesfully`;
  }

  async deletePizza(deletePizzaDto: DeletePizzaDto): Promise<string> {
    const pizza = await this.pizzaRepository.findOne({
      where: { Id: deletePizzaDto.id },
    });
    if (!pizza) {
      throw new Error(`Not found pizza with id ${deletePizzaDto.id} to delete`);
    }

    await this.pizzaRepository.remove(pizza);
    return `Pizza ${deletePizzaDto.id} deleted successfully`;
  }

  private formatError(errorMessage: string) {
    if (errorMessage.includes('Duplicate entry')) {
      throw new Error(AppErrors.DUPLICATE_REGISTER);
    } else {
      throw new Error(`Error in pizza service: ${errorMessage}`);
    }
  }
}
