import { Injectable } from '@nestjs/common';
import { User } from '../shared/types/types';
import { DbService } from '../db/db.service';

@Injectable()
export class UserService {
  constructor(private readonly db: DbService) {}
  createUser(user: User) {
    this.db.create(user);
  }

  async updateUser(userId, updatedUser) {
    await this.db.update(userId, updatedUser);
  }

  async removeUser(userId) {
    await this.db.remove(userId);
  }

  async getUser(userId) {
    const user = await this.db.getUser(userId);
    return user;
  }

  async getAllUsers() {
    const allUsers = await this.db.getUsers();
    return allUsers;
  }
}
