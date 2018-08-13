import { ApiUseTags } from '@nestjs/swagger';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Authenticate } from '../security/guards/authenticate.decator';

@ApiUseTags('home')
@Controller('/')
export class HomeController {

  @Get('')
  @HttpCode(HttpStatus.OK)
  public get() {
    return 'Hello world !';
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Authenticate()
  public me() {
    return {
      name: 'admin',
      role: 'ADMIN'
    };
  }
}
