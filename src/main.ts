import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { Logger } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common/exceptions/rpc-exception.filter';

async function bootstrap() {
  const logger = new Logger('bootstrap-gateway');
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new RpcCustomExceptionFilter());
  await app.listen(envs.port);
  logger.log(`Gateway running on port ${envs.port}`);
}
bootstrap();
