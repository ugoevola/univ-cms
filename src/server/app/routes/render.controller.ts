import { Controller, Get, HttpCode, HttpStatus, Param, NotFoundException, Post, Req, InternalServerErrorException } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { ContentService } from '@services/content.service';
import { ContentRendererService } from '@services/content-renderer.service';

@ApiUseTags('render')
@Controller('render')
// @Authenticate()
export class RenderController {

  constructor(private readonly contentService: ContentService,
    private contentRendererService: ContentRendererService) { }

  @Get(':reference')
  @HttpCode(HttpStatus.OK)
  public async get(@Param('reference') reference: string, @Req() req: Request): Promise<any> {
    const content = await this.contentService.findByReference(reference);
    if (content) {
      try {
        const renderedContent = await this.contentRendererService.render(content, req);
        return renderedContent;
      } catch (err) {
        throw new InternalServerErrorException(`An error occured while trying to render ${content.reference}`, err);
      }
    } else {
      throw new NotFoundException(`No content with reference ${reference} found`);
    }
  }

  @Post(':reference')
  @HttpCode(HttpStatus.OK)
  public async post(@Param('reference') reference: string, @Req() req: Request): Promise<any> {
    const content = await this.contentService.findByReference(reference);
    if (content) {
      try {
        const renderedContent = await this.contentRendererService.render(content, req);
        return renderedContent;
      } catch (err) {
        throw new InternalServerErrorException(`An error occured while trying to render ${content.reference}`, err);
      }
    } else {
      throw new NotFoundException(`No content with reference ${reference} found`);
    }
  }
}
