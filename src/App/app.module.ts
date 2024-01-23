import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ItemModule } from '../Item/item.module';
import { Pizza } from 'src/Item/Entity/pizza.entity';
import { Ingredient } from 'src/Item/Entity/ingredient.entity';
import { StoreModule } from 'src/Store/store.module';
import { Order } from 'src/Store/Entity/order.entity';
import { OrderPizzas } from 'src/Store/Entity/order-pizzas.entity';
import { User } from 'src/User/Entity/user.entity';
import { UserModule } from 'src/User/user.module';
import { AuthModule } from 'src/Auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/Auth/Guards/jwt-auth.guard';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
        entities: [Pizza, Ingredient, Order, OrderPizzas, User],
        database: process.env.DB_DATABASE,
      }),
    }),

    ItemModule,
    StoreModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
