import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './Entity/order.entity';
import { Repository } from 'typeorm';
import { GetOrderDto } from './Dto/get-order.dto';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getOrder(getOrderDto: GetOrderDto) {
    return await this.orderRepository.findOne({
      where: {
        id: getOrderDto.id,
      },
    });
  }
}
