import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EnvironmentService {
  constructor(private readonly config: ConfigService) { }

  get APP_PORT(): number {
    return this.config.getOrThrow<number>('APP_PORT') ?? 3000;
  }

  get DATABASE_TYPE(): string {
    return this.config.getOrThrow<string>("DATABASE_TYPE")
  }

  get DATABASE_HOST(): string {
    return this.config.getOrThrow<string>("DATABASE_HOST")
  }

  get DATABASE_PORT(): number {
    return this.config.getOrThrow<number>("DATABASE_PORT")
  }

  get DATABASE_USERNAME(): string {
    return this.config.getOrThrow<string>("DATABASE_USERNAME")
  }

  get DATABASE_PASSWORD(): string {
    return this.config.getOrThrow<string>("DATABASE_PASSWORD")
  }

  get DATABASE_NAME(): string {
    return this.config.getOrThrow<string>("DATABASE_NAME")
  }

  get RABBITMQ_URL(): string {
    return this.config.getOrThrow<string>("RABBITMQ_URL")
  }
}