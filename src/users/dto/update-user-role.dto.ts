import { IsEnum } from 'class-validator';
import { UserRole } from '../entities/user-role.enum';

// DTO hedha yesta3mlou admin bech ybaddel role mta3 user
// nverifiw elli el role eli yji howa wahed men (ADMIN ou TECH)
export class UpdateUserRoleDto {
  @IsEnum(UserRole)
  role: UserRole;
}
