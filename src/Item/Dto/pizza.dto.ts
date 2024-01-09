import { ApiProperty } from '@nestjs/swagger';

export class PizzaDto {
  @ApiProperty({ example: 29.9, nullable: false })
  price: number;

  @ApiProperty({ example: 'Calabresa', nullable: false })
  flavor: string;

  @ApiProperty({
    example: ['Calabresa', 'Cebola', 'Mussarela'],
    nullable: false,
  })
  ingredients: string[];
}
