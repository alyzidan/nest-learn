import {
  Body,
  Controller,
  Get,
  Put,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { createReviewDto } from './dtos/create-review.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { types } from 'util';
import { UserType, type JWTPayloadType } from 'src/utils/types';
import { AuthRolesGuard } from 'src/users/guards/auth-roles.guard';
import { Roles } from 'src/users/decorators/user-role.decorator';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { Review } from './entities/review.entitiy';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}
  @Get(':id')
  getreviewById(@Param('id', ParseIntPipe) id: number): any {
    return {
      id,
      name: 'Review 1',
      description: 'Review 1 description',
      rating: 5,
    };
  }
  @Post(':productId')
  @Roles(UserType.USER, UserType.ADMIN)
  @UseGuards(AuthRolesGuard)
  createReview(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() body: createReviewDto,
    @CurrentUser() payload: JWTPayloadType,
  ) {
    return this.reviewsService.createReview(productId, payload.id, body);
  }

  // update review route
  @Put(':id')
  @UseGuards(AuthRolesGuard)
  @Roles(UserType.USER, UserType.ADMIN)
  updateReview(
    @Param('reviewId', ParseIntPipe) reviewId: number,
    @Body() body: UpdateReviewDto,
    @CurrentUser() payload: JWTPayloadType,
  ) {
    return this.reviewsService.updateReview(reviewId, payload.id, body);
  }

  @Get()
  @UseGuards(AuthRolesGuard)
  @Roles(UserType.USER, UserType.ADMIN)
  /**
   * Retrieves all reviews from the database.
   * @param pageNumber The page number to retrieve.
   * @param reviewPerPage The number of reviews to retrieve per page.
   * @returns An array of all reviews from the database.
   */
  getAllReviews(
    @Query('pageNumber', ParseIntPipe) pageNumber: number,
    @Query('reviewPerPage', ParseIntPipe) reviewPerPage: number,
  ): Promise<Review[]> {
    return this.reviewsService.getAllReviews(pageNumber, reviewPerPage);
  }
}
