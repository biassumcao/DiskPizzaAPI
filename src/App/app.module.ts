import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ItemModule } from '../Item/item.module';
import { Pizza } from 'src/Item/Entity/pizza.entity';
import { Ingredient } from 'src/Item/Entity/ingredient.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PASSWORD),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        synchronize: true,
        entities: [Pizza, Ingredient],
        database: process.env.DB_DATABASE,
      }),
    }),

    ItemModule,
  ],
})
export class AppModule {}
