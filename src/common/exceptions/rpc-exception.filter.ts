import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const rpcError: any = exception.getError();

    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError &&
      !isNaN(+rpcError?.status)
    ) {
      return response.status(rpcError.status).json(rpcError);
    }

    response.status(400).json({
      ...rpcError,
      status: 400,
    });
  }
}
