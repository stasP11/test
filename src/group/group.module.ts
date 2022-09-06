import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { DbModule } from '../db/db.module';

@Module({
  controllers: [GroupController],
  providers: [GroupService],
  imports: [DbModule],
})
export class GroupModule {}
