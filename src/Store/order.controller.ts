import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { MakeOrderDto } from './Dto/make-order.dto';
import { GetOrderDto } from './Dto/get-order.dto';
import { OrderService } from './order.service';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  private readonly logger = new Logger(OrderController.name);
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({
    summary: 'Make an order',
    description: 'Make an order',
  })
  @ApiOkResponse({
    description: 'Success operation',
    type: 'string',
  })
  @ApiBody({ type: MakeOrderDto })
  @Post()
  async makeOrder(@Body() makeOrderDto: MakeOrderDto) {
    await this.orderService.makeOrder(makeOrderDto);
    return 'ok';
  }

  @Get()
  async getOrder(getOrderDto: GetOrderDto) {
    return await this.orderService.getOrder(getOrderDto);
  }
}
