import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class Pizzas {
  @IsString()
  @ApiProperty()
  flavor: string;

  @IsNumber()
  @ApiProperty()
  amount: number;
}

export class MakeOrderDto {
  @IsArray()
  @ApiProperty({ type: [Pizzas] })
  pizzas: Pizzas[];

  @IsArray()
  @ApiProperty({ isArray: true, type: 'number' })
  pizzasAmount: number[];

  @IsString()
  @ApiProperty()
  address: string;

  @IsString()
  @ApiProperty()
  paymentMethod: string;
}
