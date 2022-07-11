import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DbModule } from '../db/db.module';

@Module({
  //test
  controllers: [UserController],
  providers: [UserService],
  imports: [DbModule],
})
export class UserModule {}
