import { IsEnum } from 'class-validator';
import { OrderStatus, orderStatusList } from '../enum/order-status.enum';

export class StatusDto {
  @IsEnum(orderStatusList, {
    message: `Status must be one of the following values: ${orderStatusList.join(', ')}`,
  })
  status: OrderStatus;
}
