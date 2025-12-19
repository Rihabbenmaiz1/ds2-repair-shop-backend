import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  ArrayNotEmpty,
} from 'class-validator';

// DTO mta3 creation intervention
export class CreateInterventionDto {
  @IsString()
  @IsNotEmpty()
  // description mta3 chnoua tsala7
  description: string;

  @IsInt()
  // id mta3 device eli tetsala7
  deviceId: number;

  @IsArray()
  @ArrayNotEmpty()
  // liste mta3 ids spare parts
  sparePartIds: number[];
}
