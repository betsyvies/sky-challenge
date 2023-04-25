import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RB_URL],
      queue: process.env.RB_NAME_QUEUE,
      queueOptions: { durable: true },
      noAck: false,
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.LOCAL_PORT);
}
bootstrap();
