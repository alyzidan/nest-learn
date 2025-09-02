import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { createProductDto } from './dtos/create-products.dto';
import { updateProductDto } from './dtos/update-products.dto';
import { ProductsService } from './products.service';
import { UsersService } from 'src/users/users.service';
import { off } from 'process';

@Controller('products')
export class ProductsController {
  constructor(private readonly products: ProductsService) {}
  @Post('create')
  async createProduct(
    @Body()
    body: createProductDto,
  ) {
    console.log(body);
    return await this.products.createProduct(body); // Call service method
  }

  @Get()
  getAllproducts(
    @Query('title') title?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    // if (limit && limit < 1) {
    //   throw new BadRequestException('limit should be above 0');
    // }
    // if (offset && offset < 0) {
    //   throw new BadRequestException('offset should be above or equal 0');
    // }
    return this.products.getAllproducts(title, limit, offset);
  }
  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() body: updateProductDto) {
    return this.products.updateProduct(id, body);
  }
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    this.products.deleteProduct(id);
  }

  @Get(':id')
  getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.products.getProductById(id);
  }
}
