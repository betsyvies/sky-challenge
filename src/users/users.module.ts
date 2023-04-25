import { Module } from '@nestjs/common';
import { RmqModule } from 'src/common/rmq/rmq.module';
import { UsersController } from './users.controller';

@Module({
  imports: [
    RmqModule.register({
      name: 'USER_SERVICE',
    }),
  ],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule {}
