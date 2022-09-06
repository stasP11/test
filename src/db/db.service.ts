import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../shared/models/user';
import { Group } from '../shared/models/group';
import { Permission } from '../shared/models/permission';
import { UserGroup } from '../shared/models/user-group';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class DbService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Group) private groupModel: typeof Group,
    @InjectModel(Permission) private PermissionModel: typeof Permission,
    @InjectModel(UserGroup) private UserGroupModel: typeof UserGroup,
    private sequelize: Sequelize,
  ) {}
  async create(user) {
    const { id, login, password, age, isDeleted } = user;
    try {
      await this.userModel.create({
        userId: id,
        login: login,
        password: password,
        age: age,
        isDeleted: isDeleted,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async getUser(userId: string) {
    return this.userModel.findOne({
      where: {
        userId: userId,
      },
    });
  }

  async getUsers(): Promise<any> {
    return this.userModel.findAll();
  }

  async update(userId: string, updatedUser: any) {
    const { id, login, password, age, isDeleted } = updatedUser;
    this.userModel.update(
      { id, login, password, age, isDeleted },
      {
        where: {
          userId: userId,
        },
      },
    );
  }

  async remove(userId: string) {
    this.userModel.destroy({
      where: {
        userId: userId,
      },
    });
  }

  // groups

  async createGroup(group) {
    const { id, name, permissions } = group;
    try {
      await this.groupModel.create({
        name: name,
        groupId: id,
      });
      await this.PermissionModel.create({
        groupId: id,
        ...permissions,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async getGroup(groupId: string) {
    return this.groupModel.findOne({
      where: {
        groupId: groupId,
      },
      include: this.PermissionModel,
    });
  }

  async getGroups(): Promise<any> {
    return this.groupModel.findAll({
      include: this.PermissionModel,
    });
  }

  async removeGroup(groupId: string) {
    this.groupModel.destroy({
      where: {
        groupId: groupId,
      },
    });
  }

  async updateGroup(groupId: string, updatedData: any) {
    const { name, permissions } = updatedData;
    await this.groupModel.update(
      { name },
      {
        where: {
          groupId: groupId,
        },
      },
    );
    await this.PermissionModel.update(permissions, {
      where: {
        groupId: groupId,
      },
    });
  }

  async addUsersToGroup(groupId: any, userIds: any) {
    await this.sequelize.transaction(async (t) => {
      const transactionHost = { transaction: t };
      for (const userId of userIds) {
        await this.UserGroupModel.create(
          {
            userId: userId,
            groupId: groupId,
          },
          transactionHost,
        );
      }
    });
  }
}
