import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealtCheckController {
  @Get()
  async healtCheck() {
    return { status: "I'm alive!" };
  }
}
