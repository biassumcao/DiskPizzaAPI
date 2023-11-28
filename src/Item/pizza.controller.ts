import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PizzaDto } from './Dto/pizza.dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PizzaService } from './pizza.service';
import { UpdatePizzaDto } from './Dto/update-pizza.dto';

@ApiTags('Pizza')
@Controller('pizza')
export class PizzaController {
  private readonly logger = new Logger(PizzaController.name);
  constructor(private readonly pizzaService: PizzaService) {}

  @ApiOperation({
    summary: 'Get a pizza information',
    description: 'Get a pizza information',
  })
  @ApiOkResponse({
    description: 'Success operation',
    type: PizzaDto,
  })
  @ApiParam({ name: 'id', type: 'number' })
  @Get(':id')
  async getPizza(@Param() { id }) {
    return await this.pizzaService.getPizza({ id });
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
    try {
      return await this.pizzaService.addPizza(pizzaDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({
    summary: 'Update a pizza register',
    description: 'Update a pizza register',
  })
  @ApiOkResponse({
    description: 'Success operation',
    type: PizzaDto,
  })
  @ApiBody({ type: UpdatePizzaDto })
  @Patch()
  async updatePizza(@Body() updatePizzaDto: UpdatePizzaDto): Promise<string> {
    try {
      return await this.pizzaService.updatePizza(updatePizzaDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({
    summary: 'Remove a pizza flavor',
    description: 'Remove a pizza flavor',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @Delete(':id')
  async deletePizza(@Param() { id }): Promise<void> {
    this.pizzaService.deletePizza({ id });
  }
}
