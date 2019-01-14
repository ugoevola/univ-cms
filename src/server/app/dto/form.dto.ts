import { IsString, IsArray } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { FormItemDto } from './form-item.dto';

export class FormDto {

  @IsString()
  @ApiModelProperty()
  name: string;

  @IsArray()
  @ApiModelProperty()
  items: Array<FormItemDto>;
}
