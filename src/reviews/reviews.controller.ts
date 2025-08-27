import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

@Controller('reviews')
export class ReviewsController {
  @Get(':id')
  getreviewById(@Param('id', ParseIntPipe) id: number): any {
    return {
      id,
      name: 'Review 1',
      description: 'Review 1 description',
      rating: 5,
    };
  }
  @Get()
  getAllReviews() {
    return [
      {
        id: 1,
        name: 'Review 1',
        description: 'Review 1 description',
        rating: 5,
      },
      {
        id: 2,
        name: 'Review 2',
        description: 'Review 2 description',
        rating: 4,
      },
    ];
  }
}
