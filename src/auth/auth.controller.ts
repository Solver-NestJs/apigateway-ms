import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config/services';
import { LoginDto, RegisterDto } from './dto';

import { AuthGuard } from 'src/common/guard/auth.guards';

import { Token, User } from 'src/common/decorators';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { token, user } = await firstValueFrom(
      this.client.send('user.login', loginDto).pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      ),
    );

    response.cookie('jwt', token, { httpOnly: true });

    return response.status(HttpStatus.OK).json(user);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.client.send('user.register', registerDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  // @Get('verify')
  // verify(@Headers('authorization') heraders: any) {
  //   console.log(heraders);
  //   // return this.client.send('user.verify', {}).pipe(
  //   //   catchError((error) => {
  //   //     throw new RpcException(error);
  //   //   }),
  //   // );
  // }

  @Get('verify')
  @UseGuards(AuthGuard)
  verify(@User() user: any, @Token() token: string) {
    return { user, token };
  }
}
