import { IsNotEmpty, IsString } from 'class-validator';

// DTO hedha nesta3mlou bech ncreate device jdid
export class CreateDeviceDto {
  @IsString()
  @IsNotEmpty()
  // serial number unique mta3 device
  serialNumber: string;

  @IsString()
  @IsNotEmpty()
  // marque mta3 device (Apple, Samsung...)
  brand: string;

  @IsString()
  @IsNotEmpty()
  // model mta3 device
  model: string;
}
