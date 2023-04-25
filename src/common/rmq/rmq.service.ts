import { Injectable } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';
import { UserDto } from 'src/users/dto/users.dto';

@Injectable()
export class RmqService {
  ack(context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);
  }

  async exchangeBindQueque(users: UserDto[], context: RmqContext) {
    const channel = context.getChannelRef();
    await channel.assertExchange('users', 'fanout', { durable: true });
    await channel.assertQueue('users-requested', { durable: true });
    await channel.bindQueue('users-requested', 'users', '');
    const message = JSON.stringify(users);
    channel.publish('users', '', Buffer.from(message));
  }
}
