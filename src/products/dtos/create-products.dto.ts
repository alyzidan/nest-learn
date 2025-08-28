import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
export class createProductDto {
  @IsString()
  @IsNotEmpty()
  title: string; // Changed from 'name' to match entity

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @Min(1)
  price: number;

  @IsString()
  @IsOptional()
  image: string; // Add this field
}
