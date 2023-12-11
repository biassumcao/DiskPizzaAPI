import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './Entity/order.entity';
import { Repository } from 'typeorm';
import { GetOrderDto } from './Dto/get-order.dto';
import { MakeOrderDto } from './Dto/make-order.dto';
import { Pizza } from 'src/Item/Entity/pizza.entity';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Pizza)
    private readonly pizzaRepository: Repository<Pizza>,
  ) {}

  async makeOrder(makeOrderDto: MakeOrderDto) {
    const order = new Order(makeOrderDto.address, makeOrderDto.paymentMethod);
    const pizzas: Pizza[] = [];

    for (const p of makeOrderDto.pizzas) {
      const pizza = await this.pizzaRepository.findOne({
        where: { flavor: p.flavor },
      });
      pizzas.push(pizza);
    }

    order.pizzas = pizzas;

    return await this.orderRepository.save(order);
  }

  async getOrder(getOrderDto: GetOrderDto) {
    return await this.orderRepository.findOne({
      where: {
        id: getOrderDto.id,
      },
    });
  }
}
