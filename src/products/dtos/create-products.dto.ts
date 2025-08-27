import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
export class createProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(1)
  price: number;
}
