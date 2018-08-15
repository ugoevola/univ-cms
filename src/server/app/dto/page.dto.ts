import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsDefined, IsDate, Allow } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ObjectID } from 'mongodb';
import { Page } from '@shared/interface/page.int';

export class PageDto implements Page {

  @Allow()
  @ApiModelProperty()
  @Transform((id: string) =>  new ObjectID(id), {toClassOnly : true})
  _id?: ObjectID;

  @ApiModelProperty()
  @IsString()
  reference?: string;

  @IsString()
  @IsDefined()
  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  @Type(() => Date)
  @IsDate()
  createdOn?: Date;

  @ApiModelProperty()
  @Type(() => Date)
  @IsDate()
  updatedOn?: Date;
}
