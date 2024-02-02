import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './Dto/create-user.dto';
import { IsPublic } from 'src/Auth/decorators/is-public.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @IsPublic()
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
    this.logger.debug(createUserDto);
    return await this.userService.create(createUserDto);
  }

  @ApiParam({ name: 'email', type: 'string' })
  @Get(':email')
  async getUserByEmail(@Param('email') email: string) {
    this.logger.debug(email);
    return await this.userService.findByEmail(email);
  }
}
