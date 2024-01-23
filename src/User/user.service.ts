import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './Dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './Entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

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
      await bcrypt.hash(createUserDto.password, 10),
    );

    const createdUser = await this.userRepository.save(user);
    return {
      ...createdUser,
      password: undefined,
    };
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }
}
