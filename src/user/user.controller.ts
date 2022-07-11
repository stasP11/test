import {
  Controller,
  Get,
  Body,
  Req,
  Post,
  Delete,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../shared/types/types';
import { UserDto } from '../shared/validation/validation';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('register')
  async createUser(@Body() UserDto: UserDto) {
    await this.userService.createUser(UserDto);
  }

  @Patch('update')
  async updateUser(@Body() user: UserDto) {
    await this.userService.updateUser(user.id, user);
  }

  @Delete('remove')
  async removeUser(@Body() user: User) {
    await this.userService.removeUser(user.id);
  }

  @Get('get')
  async getUser(@Body() user: User) {
    const foundedUser = await this.userService.getUser(user.id);
    return foundedUser;
  }

  @Get('all-users')
  async getAllUsers() {
    const allUsersArray = await this.userService.getAllUsers();
    return allUsersArray;
  }
}
