import { ApiProperty } from '@nestjs/swagger';

export class Pizzas {
  @ApiProperty()
  flavor: string;

  @ApiProperty()
  amount: number;
}

export class MakeOrderDto {
  @ApiProperty({ type: [Pizzas] })
  pizzas: Pizzas[];

  @ApiProperty({ isArray: true, type: 'number' })
  pizzasAmount: number[];

  @ApiProperty()
  address: string;

  @ApiProperty()
  paymentMethod: string;
}
