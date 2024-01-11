import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './Dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './Entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User(
      createUserDto.name,
      createUserDto.email,
      createUserDto.password,
    );

    return await this.userRepository.save(user);
  }
}
