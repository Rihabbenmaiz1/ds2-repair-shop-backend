import { IsNumber, Min } from 'class-validator';

// DTO hedha yesta3mlou admin bech yzid wa2ella yna9es stock
// quantity howa 9addeh nhebou nzidou wa2ella nna9sou
export class UpdateStockDto {
  @IsNumber()
  @Min(1)
  quantity: number;
}
