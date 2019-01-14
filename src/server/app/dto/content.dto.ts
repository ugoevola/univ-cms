import { Content } from '@shared/interface/content.int';
import { ApiModelProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { ObjectID } from 'mongodb';
import { IsString, IsDefined, IsDate, Allow, IsEnum, ValidateNested, ValidateIf } from 'class-validator';
import { ContentType } from '@shared/enum/content-type.enum';
import { ContentDataDto } from './content-data.dto';
import { FormDto } from './form.dto';
export class ContentDto implements Content {

  @Allow()
  @ApiModelProperty()
  @Transform((id: string) => new ObjectID(id), { toClassOnly: true })
  _id?: ObjectID;

  @IsString()
  @ApiModelProperty()
  reference?: string;

  @IsString()
  @IsDefined()
  @ApiModelProperty({ required: true })
  name: string;

  @IsString()
  @IsDefined()
  @ApiModelProperty({ required: true })
  description: string;

  @IsEnum(ContentType)
  @IsDefined()
  @ApiModelProperty({ required: true })
  type: ContentType;

  @IsString()
  @ApiModelProperty()
  content?: string;

  @ValidateNested()
  @Type(() => ContentDataDto)
  @ApiModelProperty()
  data?: ContentDataDto;

  @ValidateIf((dto: ContentDto) => dto.type === 'FORM')
  @IsDefined()
  @ValidateNested()
  @Type(() => FormDto)
  @ApiModelProperty()
  form?: FormDto;

  @ApiModelProperty()
  @Type(() => Date)
  @IsDate()
  createdOn?: Date;

  @ApiModelProperty()
  @Type(() => Date)
  @IsDate()
  updatedOn?: Date;
}
