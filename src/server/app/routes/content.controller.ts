import { Controller, Post, Put, Body, Delete, HttpStatus, HttpCode, Param, Get, NotFoundException, UsePipes } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { CustomValidationPipe } from '@common/validations/custom-validation.pipe';
import { ContentService } from '@services/content.service';
import { ContentDto } from '../dto/content.dto';
import { Authenticate } from '../security/guards/authenticate.decator';

@ApiUseTags('content')
@Controller('content')
@Authenticate()
export class ContentController {

  constructor(private readonly contentService: ContentService) {
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new CustomValidationPipe())
  public async create(@Body() contentDto: ContentDto) {
    const newContent = await this.contentService.create(contentDto);
    return newContent;
  }

  @Put(':reference')
  @HttpCode(HttpStatus.ACCEPTED)
  @UsePipes(new CustomValidationPipe())
  public async update(@Param('reference') reference: string, @Body() contentDto: ContentDto) {
    const pageUpdated = await this.contentService.update(reference, contentDto);
    return pageUpdated;
  }

  @Delete(':reference')
  @HttpCode(HttpStatus.ACCEPTED)
  public async delete(@Param('reference') reference: string) {
    const deleteResult = await this.contentService.delete(reference);
    if (!deleteResult) {
      throw new NotFoundException(`No page with reference ${reference} found`);
    }
  }

  @Get('list')
  @HttpCode(HttpStatus.OK)
  public async list(): Promise<Array<ContentDto>> {
    const contents = await this.contentService.listAll();
    return contents;
  }

  @Get(':reference')
  @HttpCode(HttpStatus.OK)
  public async get(@Param('reference') reference: string): Promise<ContentDto> {
    const content = await this.contentService.findByReference(reference);
    if (content) {
      return content;
    } else {
      throw new NotFoundException(`No content with reference ${reference} found`);
    }
  }
}
