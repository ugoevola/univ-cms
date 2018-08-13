import { Controller, Post, Put, Body, Delete, HttpStatus, HttpCode, Param, Get, NotFoundException, UsePipes } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { PageService } from '@services/page.service';
import { CustomValidationPipe } from '@common/validations/custom-validation.pipe';
import { PageDto } from '../dto/page.dto';
import { Authenticate } from '../security/guards/authenticate.decator';

@ApiUseTags('page')
@Controller('page')
@Authenticate()
export class PageController {

  constructor(private readonly pageService: PageService) {
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new CustomValidationPipe())
  public async create(@Body() pageDto: PageDto) {
    const newPage = await this.pageService.create(pageDto);
    return newPage;
  }

  @Put(':reference')
  @HttpCode(HttpStatus.ACCEPTED)
  @UsePipes(new CustomValidationPipe())
  public async update(@Param('reference') reference: string, @Body() pageDto: PageDto) {
    const pageUpdated = await this.pageService.update(reference, pageDto);
    return pageUpdated;
  }

  @Delete(':reference')
  @HttpCode(HttpStatus.ACCEPTED)
  public async delete(@Param('reference') reference: string) {
    const deleteResult = await this.pageService.delete(reference);
    if (!deleteResult) {
      throw new NotFoundException(`No page with reference ${reference} found`);
    }
  }

  @Get('list')
  @HttpCode(HttpStatus.OK)
  public async list(): Promise<Array<PageDto>> {
    const pages = await this.pageService.listAll();
    return pages;
  }

  @Get(':reference')
  @HttpCode(HttpStatus.OK)
  public async get(@Param('reference') reference: string): Promise<any> {
    const page = await this.pageService.findByReference(reference);
    if (page) {
      return page;
    } else {
      throw new NotFoundException(`No page with reference ${reference} found`);
    }
  }
}
