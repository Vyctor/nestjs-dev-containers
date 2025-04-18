import { Body, Controller, Get, HttpCode, Inject, Logger, Post } from '@nestjs/common';
import { ClientRMQ, Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    @Inject("RABBITMQ_SERVICE") private readonly client: ClientRMQ, @InjectRepository(Order) private readonly orderRepository: Repository<Order>
  ) { }

  @Post()
  @HttpCode(200)
  async receiveOrder(@Body() body: {
    orderId: string;
    value: number;
    status: string;
  }) {
    this.logger.log(`Received order: ${JSON.stringify(body)}`);
    const order = body;
    this.client.emit('orders_queue', order);
    return {
      status: 'success',
      message: 'Order received',
    };
  }

  @MessagePattern('orders_queue')
  async printOrders(@Payload() data: {
    orderId: string;
    value: number;
    status: string;
  }, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    this.logger.log(`Received message: ${JSON.stringify(data)}`);
    const order = await this.orderRepository.insert(data);
    channel.ack(originalMsg);
    this.logger.log(`Order saved: ${JSON.stringify(order)}`);
  }
}
