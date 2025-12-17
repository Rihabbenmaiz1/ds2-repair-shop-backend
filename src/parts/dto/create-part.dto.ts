import { IsNumber, IsString, Min } from 'class-validator';

// DTO hedha yesta3mlou admin bech ycreate piece jdida
// name: esm mta3 piece
// stock: 9addeh men piece mawjoud
// price: soum mta3 piece
export class CreatePartDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsNumber()
  @Min(0)
  price: number;
}
