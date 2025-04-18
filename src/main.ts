import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { EnvironmentService } from './environment.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://orders:orders@rabbitmq:5672'],
      queue: 'orders_queue',
      queueOptions: {
        durable: true
      },
      noAck: false,
    }

  });
  const environmentService = app.get(EnvironmentService);

  await app.startAllMicroservices();
  await app.listen(environmentService.APP_PORT);
}
bootstrap();

