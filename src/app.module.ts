import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { NatsModule } from './transportes/nats.module';
import { AuthModule } from './auth/auth.module';
import { HealCheckModule } from './healt/heal.module';

@Module({
  imports: [
    ProductsModule,
    OrdersModule,
    NatsModule,
    AuthModule,
    HealCheckModule,
  ],
})
export class AppModule {}
