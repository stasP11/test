import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class DbService {
  constructor(@Inject('CACHE_MANAGER') private cacheManager: Cache) {}
  async create(user) {
    const users: any = await this.cacheManager.get('users');
    if (!users) {
      await this.cacheManager.set('users', [user], { ttl: 0 });
    } else {
      users.push(user);
      await this.cacheManager.set('users', users, { ttl: 0 });
    }
  }

  async getUser(userId: string) {
    const users: any = await this.cacheManager.get('users');
    const needUserArray = users.filter((user) => user.id === userId);
    return needUserArray[0];
  }

  async getUsers() {
    const users: any = await this.cacheManager.get('users');
    return users;
  }

  async update(userId: string, updatedUser: any) {
    const users: any = await this.cacheManager.get('users');
    const usersArray = users.filter((user) => user.id !== userId);
    usersArray.push(updatedUser);
    await this.cacheManager.set('users', usersArray, { ttl: 0 });
  }

  async remove(userId: string) {
    const users: any = await this.cacheManager.get('users');
    const updatedUser = users.filter((user) => {
      return user.id !== userId;
    });
    await this.cacheManager.reset();
    await this.cacheManager.set('users', updatedUser, { ttl: 0 });
  }

  async reset() {
    await this.cacheManager.reset();
  }
}
