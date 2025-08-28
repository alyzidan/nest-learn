import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class updateProductDto {
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(1)
  price?: number;
}
