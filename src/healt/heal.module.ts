import { Module } from '@nestjs/common';
import { HealtCheckController } from './healcheck.controller';

@Module({
  controllers: [HealtCheckController],
})
export class HealCheckModule {}
