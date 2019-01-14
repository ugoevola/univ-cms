import { IsString, IsDefined, ValidateIf, IsArray } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { FormItem } from '@shared/interface/form-item.int';

export class FormItemDto implements FormItem {

  @IsString()
  @ApiModelProperty()
  type: string;

  @ValidateIf((dto: FormItemDto) => dto.type === 'container')
  @IsDefined()
  @IsString()
  @ApiModelProperty()
  direction?: string;

  @IsArray()
  @ApiModelProperty()
  bindings?: any;

  @IsArray()
  @ApiModelProperty()
  validations?: Array<any>;

  @IsArray()
  @ApiModelProperty()
  children?: Array<FormItemDto>;
}
