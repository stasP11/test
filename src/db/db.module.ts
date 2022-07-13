import { Module, CacheModule } from '@nestjs/common';
import { DbService } from './db.service';
import { User } from '../shared/models/user';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [CacheModule.register(), SequelizeModule.forFeature([User])],
  providers: [DbService],
  exports: [DbService, SequelizeModule],
})
export class DbModule {}
