import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PizzaDto } from './Dto/pizza.dto';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PizzaService } from './pizza.service';

@ApiTags('Pizza')
@Controller('pizza')
export class PizzaController {
  constructor(private readonly pizzaService: PizzaService) {}

  @ApiOperation({
    summary: 'Get a pizza information',
    description: 'Get a pizza information',
  })
  @ApiOkResponse({
    description: 'Success operation',
    type: PizzaDto,
  })
  @Get(':id')
  async getPizza(@Param() id): Promise<PizzaDto> {
    return await this.pizzaService.getPizza({ id: id });
  }

  @ApiOperation({
    summary: 'Register a new pizza flavor',
    description: 'Register a new pizza flavor',
  })
  @ApiOkResponse({
    description: 'Success operation',
    type: PizzaDto,
  })
  @ApiBody({ type: PizzaDto })
  @Post()
  async addPizza(@Body() pizzaDto: PizzaDto): Promise<PizzaDto> {
    return await this.pizzaService.addPizza(pizzaDto);
  }

  @ApiOperation({
    summary: 'Update a pizza register',
    description: 'Update a pizza register',
  })
  @ApiOkResponse({
    description: 'Success operation',
    type: PizzaDto,
  })
  @Patch()
  async updatePizza(): Promise<PizzaDto> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Remove a pizza flavor',
    description: 'Remove a pizza flavor',
  })
  @Delete()
  async deletePizza(): Promise<void> {
    throw new NotImplementedException();
  }
}
