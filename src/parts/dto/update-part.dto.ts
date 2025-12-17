import { IsNumber, IsOptional, Min } from 'class-validator';

// DTO hedha yesta3mlou admin bech ybaddel stock w2ella price
// kol champ optional (tnajem tbaddel wa7ed bark)
export class UpdatePartDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;
}
