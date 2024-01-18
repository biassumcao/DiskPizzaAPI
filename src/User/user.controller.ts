import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './Dto/create-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Creates a new User',
    description: 'Creates a new User',
  })
  @ApiOkResponse({
    description: 'Success operation',
  })
  @ApiBody({ type: CreateUserDto })
  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @ApiParam({ name: 'email', type: 'string' })
  @Get(':email')
  async getUserByEmail(@Param('email') email: string) {
    return await this.userService.findByEmail(email);
  }

  @Post('login')
  async verifyUser() {
    return '';
  }
}
