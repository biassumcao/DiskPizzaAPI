import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IsPublic } from 'src/Auth/decorators/is-public.decorator';
import { CurrentUser } from 'src/Auth/Decorators/current-user.decorator';
import { User } from 'src/User/Entity/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @IsPublic()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('me')
  getMe(@CurrentUser() user: User): User {
    return user;
  }
}
