import { Content } from '@shared/interface/content.int';
import { ApiModelProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { ObjectID } from 'mongodb';
import { IsString, IsDefined, IsDate, Allow } from 'class-validator';
export class ContentDto implements Content {

  @Allow()
  @ApiModelProperty()
  @Transform((id: string) =>  new ObjectID(id), {toClassOnly : true})
  _id?: ObjectID;

  @IsString()
  @ApiModelProperty()
  reference?: string;

  @IsString()
  @IsDefined()
  @ApiModelProperty()
  name: string;

  @IsString()
  @ApiModelProperty()
  content: string;

  @ApiModelProperty()
  @Type(() => Date)
  @IsDate()
  createdOn?: Date;

  @ApiModelProperty()
  @Type(() => Date)
  @IsDate()
  updatedOn?: Date;
}
