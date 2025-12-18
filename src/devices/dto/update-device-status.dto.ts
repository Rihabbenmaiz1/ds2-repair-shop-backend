import { IsEnum } from 'class-validator';
import { DeviceStatus } from '../entities/device-status.enum';

// DTO hedha nesta3mlou bech nbadlou status mta3 device
export class UpdateDeviceStatusDto {
  @IsEnum(DeviceStatus)
  // status jdid (PENDING, REPAIRING, READY)
  status: DeviceStatus;
}
