import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { User } from '../shared/types/types';

@Injectable()
export class GroupService {
  constructor(private readonly db: DbService) {}
  createGroupe(group: any) {
    const { permissions } = group;
    const permissionsObj = {};
    for (const permission of permissions) {
      permissionsObj[permission.toLowerCase()] = true;
    }
    group.permissions = permissionsObj;
    this.db.createGroup(group);
  }

  async updateGroup(groupId, updatedGroup) {
    const { permissions } = updatedGroup;
    const permissionsObj = {};
    for (const permission of permissions) {
      permissionsObj[permission.toLowerCase()] = true;
    }
    updatedGroup.permissions = permissionsObj;
    await this.db.updateGroup(groupId, updatedGroup);
  }

  async removeGroup(groupId) {
    await this.db.removeGroup(groupId);
  }

  async getGroup(groupId) {
    return await this.db.getGroup(groupId.id);
  }

  async getAllGroups() {
    return await this.db.getGroups();
  }
  async addUsersToGroup(groupId, userIds) {
    return await this.db.addUsersToGroup(groupId, userIds);
  }
}
