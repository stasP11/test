import { Module, CacheModule } from '@nestjs/common';
import { DbService } from './db.service';
import { User } from '../shared/models/user';
import { Group } from '../shared/models/group';
import { SequelizeModule } from '@nestjs/sequelize';
import { Permission } from '../shared/models/permission';
import { UserGroup } from '../shared/models/user-group';

@Module({
  imports: [
    CacheModule.register(),
    SequelizeModule.forFeature([User, Group, Permission, UserGroup]),
  ],
  providers: [DbService],
  exports: [DbService, SequelizeModule],
})
export class DbModule {}
