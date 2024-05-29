import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config/services';

export class AuthGuard implements CanActivate {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractJwtHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      console.log('sss');
      const { user, token: newToken } = await firstValueFrom(
        this.client.send('user.verify', { token }),
      );

      request['user'] = user;
      request['token'] = newToken;
    } catch (error) {
      throw new UnauthorizedException('Token not found');
    }

    return true;
  }

  extractJwtHeader = (request: Request) => {
    const [type, token] = request.headers['authorization']?.split(' ');
    return type === 'Bearer' ? token : undefined;
  };
}
