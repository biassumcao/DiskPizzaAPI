import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { MakeOrderDto } from './Dto/make-order.dto';
import { OrderService } from './order.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

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

  @ApiParam({ name: 'id', type: 'number' })
  @Get()
  async getOrder(@Param() { id }) {
    return await this.orderService.getOrder({ id });
  }
}
