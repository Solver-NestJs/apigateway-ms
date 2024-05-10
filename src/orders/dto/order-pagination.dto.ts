import { PaginationDto } from 'src/common/dtos/paginationDto';
import { OrderStatus, orderStatusList } from '../enum/order-status.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class OrderPaginationDto extends PaginationDto {
  @IsEnum(orderStatusList, { message: `Valores permitos ${orderStatusList}` })
  @IsOptional()
  status: OrderStatus;
}
