import { IsNotEmpty, IsString } from 'class-validator';

export class createReviewDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  comment: string;
}
