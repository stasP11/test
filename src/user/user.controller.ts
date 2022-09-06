import {
  Controller,
  Get,
  Body,
  Req,
  Post,
  Delete,
  Patch,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from '../shared/validation/validation';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post(':id')
  async createUser(@Body() UserDto: UserDto) {
    await this.userService.createUser(UserDto);
  }

  @Patch(':id')
  async updateUser(@Param() params: any, @Body() user: UserDto) {
    await this.userService.updateUser(params.id, user);
  }

  @Delete(':id')
  async removeUser(@Param() params: any) {
    await this.userService.removeUser(params.id);
  }

  @Get(':id')
  async getUser(@Param() params: any) {
    const foundedUser = await this.userService.getUser(params.id);
    return foundedUser;
  }

  @Get('all-users')
  async getAllUsers() {
    const allUsersArray = await this.userService.getAllUsers();
    return allUsersArray;
  }
}
