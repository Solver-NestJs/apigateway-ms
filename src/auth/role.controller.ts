import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/services';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { catchError } from 'rxjs';

@Controller('role')
export class RoleController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('create')
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.client.send('role.create', createRoleDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  //PATCH //http://localhost:3000/api/role/1
  @Patch(':id')
  updateRole(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.client.send('role.update', { id, ...updateRoleDto }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  //DELETE //http://localhost:3000/api/role/1
  @Delete(':id')
  deleteRole(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('role.delete', { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('role.findOne', { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get()
  findAll() {
    return this.client.send('role.findAll', {}).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
