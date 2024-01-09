import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PizzaController } from './pizza.controller';
import { Pizza } from './Entity/pizza.entity';
import { PizzaService } from './pizza.service';
import { Ingredient } from './Entity/ingredient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pizza, Ingredient])],
  controllers: [PizzaController],
  providers: [PizzaService],
})
export class ItemModule {}
