import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from 'src/config/services';
import { LoginDto, RegisterDto } from './dto';

import { AuthGuard } from 'src/common/guard/auth.guards';

import { Token, User } from 'src/common/decorators';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.client.send('user.login', loginDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
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

    //console.log(resquest['token']);
    // return this.client.send('user.verify', {}).pipe(
    //   catchError((error) => {
    //     throw new RpcException(error);
    //   }),
    // );
  }
}
