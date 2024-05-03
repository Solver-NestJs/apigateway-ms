import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
  ParseIntPipe,
} from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PRODUCT_SERVICE } from 'src/config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dtos/paginationDto';
import { catchError } from 'rxjs';

@Controller('products')
export class ProductsController {
  constructor(@Inject(PRODUCT_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.client.send({ cmd: 'create-product' }, createProductDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get()
  findAll(@Query() paginationdto: PaginationDto) {
    return this.client.send({ cmd: 'find-all' }, paginationdto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'find-one' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.client
      .send({ cmd: 'update' }, { ...updateProductDto, id })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'remove' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
