import {
  IsNotEmpty,
  IsPositive,
  IsDecimal,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDecimal()
  @IsPositive()
  price: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsPositive()
  quantity: number;
}
