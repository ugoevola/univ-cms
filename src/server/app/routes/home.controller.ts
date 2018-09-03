import { ApiUseTags } from '@nestjs/swagger';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Authenticate } from '../security/guards/authenticate.decator';
import { User } from '@common/decorators/user.decorator';

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
  public me(@User() user) {
    return user;
  }
}
