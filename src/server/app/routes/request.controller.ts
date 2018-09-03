import { Controller, Post, Put, Body, Delete, HttpStatus, HttpCode, Param, Get, NotFoundException, UsePipes } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { CustomValidationPipe } from '@common/validations/custom-validation.pipe';
import { RequestService } from '@services/request.service';
import { RequestDto } from '../dto/request.dto';
import { Authenticate } from '../security/guards/authenticate.decator';

@ApiUseTags('request')
@Controller('request')
@Authenticate()
export class RequestController {

  constructor(private readonly requestService: RequestService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new CustomValidationPipe())
  public async create(@Body() requestDto: RequestDto) {
    const newContent = await this.requestService.create(requestDto);
    return newContent;
  }

  @Put(':reference')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new CustomValidationPipe())
  public async update(@Param('reference') reference: string, @Body() requestDto: RequestDto) {
    const pageUpdated = await this.requestService.update(reference, requestDto);
    return pageUpdated;
  }

  @Delete(':reference')
  @HttpCode(HttpStatus.OK)
  public async delete(@Param('reference') reference: string) {
    const deleteResult = await this.requestService.delete(reference);
    if (!deleteResult) {
      throw new NotFoundException(`No request with reference ${reference} found`);
    }
  }

  @Get('list')
  @HttpCode(HttpStatus.OK)
  public async list(): Promise<Array<RequestDto>> {
    const contents = await this.requestService.listAll();
    return contents;
  }

  @Get(':reference')
  @HttpCode(HttpStatus.OK)
  public async get(@Param('reference') reference: string): Promise<RequestDto> {
    const content = await this.requestService.findByReference(reference);
    if (content) {
      return content;
    } else {
      throw new NotFoundException(`No request with reference ${reference} found`);
    }
  }
}
