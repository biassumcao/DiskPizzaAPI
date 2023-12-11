import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './Entity/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Pizza } from 'src/Item/Entity/pizza.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Pizza])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class StoreModule {}
