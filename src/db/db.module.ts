import { Module, CacheModule } from '@nestjs/common';
import { DbService } from './db.service';

@Module({
  imports: [CacheModule.register()],
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
