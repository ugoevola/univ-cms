import { IsDefined, ValidateIf,  IsString, IsIn, ValidateNested } from 'class-validator';
import { RequestDto } from './request.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ContentDataDto {

  @IsDefined()
  @IsIn(['BODY', 'URL', 'REQUEST'])
  from: 'BODY' | 'URL' | 'REQUEST';

  @ValidateIf(dto =>  dto.from === 'URL')
  @IsDefined()
  @IsIn(['GET', 'POST'])
  method?: 'GET' | 'POST';

  @ValidateIf(dto => dto.from === 'URL')
  @IsDefined()
  url?: string;

  @IsString()
  body?: string;

  @IsString()
  fromBody?: string;

  @ValidateNested()
  @Type(() => RequestDto)
  @ApiModelProperty()
  request?: RequestDto;

  @IsString()
  exampleBody?: string;
}
