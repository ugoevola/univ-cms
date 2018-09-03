import { Request } from '@shared/interface/request.int';
import { ApiModelProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { ObjectID } from 'mongodb';
import { IsString, IsDefined, IsDate, Allow, IsIn } from 'class-validator';

export class RequestDto implements Request {

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

  @IsDefined()
  @IsIn(['GET', 'POST'])
  method: 'GET' | 'POST';

  @IsDefined()
  url: string;

  @IsString()
  body?: string;

  @ApiModelProperty()
  @Type(() => Date)
  @IsDate()
  createdOn?: Date;

  @ApiModelProperty()
  @Type(() => Date)
  @IsDate()
  updatedOn?: Date;
}
