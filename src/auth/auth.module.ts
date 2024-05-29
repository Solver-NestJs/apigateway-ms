import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { NatsModule } from 'src/transportes';
import { RoleController } from './role.controller';

@Module({
  controllers: [AuthController, RoleController],
  imports: [NatsModule],
})
export class AuthModule {}
