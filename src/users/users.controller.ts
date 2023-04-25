import { Controller } from '@nestjs/common';
import { Ctx, Payload, MessagePattern } from '@nestjs/microservices';
import { RmqContext } from '@nestjs/microservices';
import { RmqService } from 'src/common/rmq/rmq.service';
import { UserDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly rqmService: RmqService) {}

  @MessagePattern({ cmd: 'users-message' })
  async addUser(@Payload() users: UserDto[], @Ctx() context: RmqContext) {
    this.rqmService.ack(context);
    this.rqmService.exchangeBindQueque(users, context);
    return users;
  }
}
