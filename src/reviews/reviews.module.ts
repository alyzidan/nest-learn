import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entitiy';

import { ProductsModule } from 'src/products/products.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [ReviewsService],
  controllers: [ReviewsController],
  exports: [ReviewsService],
  imports: [
    TypeOrmModule.forFeature([Review]),
    ProductsModule,
    UsersModule,
    JwtModule,
  ],
})
export class ReviewsModule {}
