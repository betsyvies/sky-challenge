import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { RmqModule } from 'src/common/rmq/rmq.module';
import { TestController } from './test.controller';
import { TestService } from './test.service';

@Module({
  imports: [
    HttpModule,
    RmqModule.register({
      name: 'USER_SERVICE',
    }),
  ],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
