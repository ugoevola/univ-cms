import { ApiUseTags } from '@nestjs/swagger';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@ApiUseTags('')
@Controller('')
export class HomeController {

  @Get('')
  @HttpCode(HttpStatus.OK)
  public get() {
    return 'Hello world !';
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  public me() {
    return {
      name: 'admin',
      role : 'ADMIN'
    };
  }
}
