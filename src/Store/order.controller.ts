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
import { CurrentUser } from 'src/Auth/Decorators/current-user.decorator';
import { User } from 'src/User/Entity/user.entity';

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
  async makeOrder(
    @Body() makeOrderDto: MakeOrderDto,
    @CurrentUser() user: User,
  ) {
    this.logger.debug(makeOrderDto);
    await this.orderService.makeOrder(makeOrderDto, user);
    return 'ok';
  }

  @ApiParam({ name: 'id', type: 'number' })
  @Get(':id')
  async getOrder(@Param() { id }) {
    this.logger.debug(id);
    return await this.orderService.getOrder({ id });
  }

  @Get()
  async getAllOrders(@CurrentUser() user: User) {
    this.logger.debug(user);
    return await this.orderService.getAllUserOrders(user);
  }
}
