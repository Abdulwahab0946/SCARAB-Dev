import { IsNotEmpty, IsPositive, IsString, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsPositive()
  price: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsPositive()
  quantity: number;
}
