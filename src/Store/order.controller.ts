import { Body, Controller, Logger, Post } from '@nestjs/common';
import { MakeOrderDto } from './Dto/make-order.dto';
import { GetOrderDto } from './Dto/get-order.dto';

@Controller()
export class OrderController {
  private readonly logger = new Logger(OrderController.name);

  @Post()
  makeOrder(@Body() makeOrderDto: MakeOrderDto) {
    return makeOrderDto;
  }

  @Post()
  getOrder(getOrderDto: GetOrderDto) {
    return getOrderDto;
  }
}
