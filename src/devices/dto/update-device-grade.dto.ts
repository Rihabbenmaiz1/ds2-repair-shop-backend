import { IsEnum } from 'class-validator';
import { DeviceGrade } from '../entities/device-grade.enum';

// DTO hedha yesta3mlou bech nbadlou grade mta3 device
export class UpdateDeviceGradeDto {
  @IsEnum(DeviceGrade)
  // grade jdid (A / B / C / NONE)
  grade: DeviceGrade;
}
