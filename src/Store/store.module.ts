import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './Entity/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Pizza } from 'src/Item/Entity/pizza.entity';
import { OrderPizzas } from './Entity/order-pizzas.entity';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Pizza, OrderPizzas])],
  controllers: [OrderController, MenuController],
  providers: [OrderService, MenuService],
})
export class StoreModule {}
