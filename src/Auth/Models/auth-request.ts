import { Request } from 'express';
import { User } from 'src/User/Entity/user.entity';

export interface AuthRequest extends Request {
  user: User;
}
