import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './Entity/order.entity';
import { Repository } from 'typeorm';
import { GetOrderDto } from './Dto/get-order.dto';
import { MakeOrderDto } from './Dto/make-order.dto';
import { Pizza } from 'src/Item/Entity/pizza.entity';
import { OrderPizzas } from './Entity/order-pizzas.entity';
import { User } from 'src/User/Entity/user.entity';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Pizza)
    private readonly pizzaRepository: Repository<Pizza>,
    @InjectRepository(OrderPizzas)
    private readonly orderPizzasRepository: Repository<OrderPizzas>,
  ) {}

  async makeOrder(makeOrderDto: MakeOrderDto, user: User) {
    const order = new Order(makeOrderDto.address, makeOrderDto.paymentMethod);
    const pizzas: Pizza[] = [];

    for (const p of makeOrderDto.pizzas) {
      const pizza = await this.pizzaRepository.findOne({
        where: { flavor: p.flavor },
      });
      pizzas.push(pizza);
    }

    order.pizzas = pizzas;
    order.userId = user.id;

    const savedOrder = await this.orderRepository.save(order);

    const orderPizzas = await this.orderPizzasRepository.find({
      where: { orderId: savedOrder.id },
    });

    for (let i = 0; i < orderPizzas.length; i++) {
      orderPizzas[i].amount = makeOrderDto.pizzasAmount[i];
    }

    await this.orderPizzasRepository.save(orderPizzas);

    return savedOrder;
  }

  async getOrder(getOrderDto: GetOrderDto) {
    return await this.orderRepository.findOne({
      where: {
        id: getOrderDto.id,
      },
    });
  }

  async getAllUserOrders(user: User) {
    return await this.orderRepository.find({
      where: {
        userId: user.id,
      },
      relations: { pizzas: true },
    });
  }
}
