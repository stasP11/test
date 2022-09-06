import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Param,
} from '@nestjs/common';
import { UserDto } from '../shared/validation/validation';
import { User } from '../shared/types/types';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}
  @Post()
  async createUser(@Body() group: any) {
    await this.groupService.createGroupe(group);
    return 'event was created';
  }

  @Patch(':id')
  async updateUser(@Param() params: any, @Body() group: any) {
    await this.groupService.updateGroup(params.id, group);
    return `group with id-${params.id} was updated`;
  }
  @Get(':id')
  async getUser(@Param() params: any) {
    return await this.groupService.getGroup(params.id);
  }

  @Get()
  async getAllGroups() {
    return await this.groupService.getAllGroups();
  }

  @Delete(':id')
  async removeGroup(@Param() params: any) {
    await this.groupService.removeGroup(params.id);
    return `group with id ${params.id} was deleted`;
  }

  @Delete('')
  async removeGroups() {
    // await this.groupService.removeGroup(params.id);
    return `all groups were removed`;
  }

  @Post(':groupId/user/:userIds')
  async test(@Param() params: any) {
    const { userIds } = params;
    params.userIds = await userIds.split('&');
    await this.groupService.addUsersToGroup(params.groupId, params.userIds);
  }
}
