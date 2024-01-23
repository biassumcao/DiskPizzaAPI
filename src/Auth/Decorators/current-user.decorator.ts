import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from 'src/User/Entity/user.entity';
import { AuthRequest } from '../Models/auth-request';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
