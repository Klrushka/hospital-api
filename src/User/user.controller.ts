import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/user/user.create.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/user')
  async create(@Body() user: CreateUserDto) {
    return await this.userService.create(user);
  }
}
