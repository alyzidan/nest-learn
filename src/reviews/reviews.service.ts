import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Review } from './entities/review.entitiy';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { createReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * Create a new review in the database.
   * @param productId The ID of the product to associate with the review.
   * @param userId The ID of the user to associate with the review.
   * @param dto The data to create the review with.
   * @returns The newly created review.
   * @throws {NotFoundException} if the user or product do not exist.
   */
  public async createReview(
    productId: number,
    userId: number,
    dto: createReviewDto,
  ) {
    const product = await this.productsService.getProductById(productId);
    const user = await this.usersService.getCurrentUser(userId);
    const review = this.reviewRepository.create({
      ...dto,
      user,
      product,
    });
    const result = await this.reviewRepository.save(review);
    return {
      id: result.id,
      comment: result.comment,
      rating: result.rating,
      createdAt: result.createdAt,
      productId: product.id,
    };
  }

  // update review

  /**
   * Updates a review in the database.
   * @param id The ID of the review to update.
   * @param body The data to update the review with.
   * @returns The updated review.
   * @throws {NotFoundException} if the review with the given ID does not exist.
   */
  async updateReview(reviewId: number, userId: number, body: UpdateReviewDto) {
    // console.log(reviewId, userId, body);
    const review = await this.getReviewById(reviewId);
    if (review?.user.id !== userId) {
      throw new ForbiddenException('You are not allowed to update this review');
    }
    if (!review) {
      throw new ForbiddenException('Review not found');
    }
    this.reviewRepository.merge(review, body);
    return this.reviewRepository.save(review);
  }
  /**
   * Retrieves all reviews from the database.
   * @returns An array of all revie ws from the database.
   */
  async getAllReviews(pageNumber: number, reviewPerPage: number) {
    return this.reviewRepository.find({
      order: { createdAt: 'DESC' },
      take: reviewPerPage,
      skip: reviewPerPage * (pageNumber - 1),
    });
  }

  /**
   * Finds a review by its ID.
   * @param id The ID of the review to find.
   * @returns The review with the given ID.
   * @throws {NotFoundException} if the review with the given ID does not exist.
   */
  private async getReviewById(id: number): Promise<Review> {
    const review = await this.reviewRepository.findOneBy({
      id,
    });
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    return review;
  }
}
