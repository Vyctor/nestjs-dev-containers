import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { EnvironmentService } from './environment.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validationSchema: Joi.object({
        APP_PORT: Joi.number().default(3000),
        DATABASE_HOST: Joi.string(),
        DATABASE_PORT: Joi.number(),
        DATABASE_USERNAME: Joi.string(),
        DATABASE_PASSWORD: Joi.string(),
        DATABASE_NAME: Joi.string(),
        RABBITMQ_URL: Joi.string(),
      })
    }),
    TypeOrmModule.forRootAsync({
      imports: [AppModule],
      inject: [EnvironmentService],
      useFactory: (config: EnvironmentService) => ({
        type: config.DATABASE_TYPE as any,
        host: config.DATABASE_HOST,
        port: config.DATABASE_PORT,
        username: config.DATABASE_USERNAME,
        password: config.DATABASE_PASSWORD,
        database: config.DATABASE_NAME,
        entities: [Order],
        synchronize: true,
      })
    }),
    TypeOrmModule.forFeature([Order]),
    ClientsModule.registerAsync([
      {
        imports: [AppModule],
        inject: [EnvironmentService],
        useFactory: (config: EnvironmentService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.RABBITMQ_URL],
            queue: 'orders_queue',
            queueOptions: {
              durable: true
            },
            noAck: true,
          }
        }),
        name: 'RABBITMQ_SERVICE',
      }
    ])
  ],
  controllers: [AppController],
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export class AppModule { }
