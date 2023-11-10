import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PizzaController } from './pizza.controller';
import { Pizza } from './pizza.entity';
import { PizzaService } from './pizza.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pizza])],
  controllers: [PizzaController],
  providers: [PizzaService],
})
export class ItemModule {}
