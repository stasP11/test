import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../shared/models/user';

@Injectable()
export class DbService {
  constructor(
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}
  async create(user) {
    const users: any = await this.cacheManager.get('users');
    const { id, login, password, age, isDeleted } = user;
    try {
      await this.userModel.create({
        user_id: id,
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
        user_id: userId,
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
          id: userId,
        },
      },
    );
  }

  async remove(userId: string) {
    this.userModel.destroy({
      where: {
        user_id: userId,
      },
    });
  }
}
