import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { createProductDto } from './dtos/create-products.dto';
import { updateProductDto } from './dtos/update-products.dto';
import { ProductsService } from './products.service';
import { UsersService } from 'src/users/users.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly products: ProductsService,
    private readonly usersService: UsersService,
  ) {}
  @Post('create')
  async createProduct(
    @Body()
    body: createProductDto,
  ) {
    console.log(body);
    return await this.products.createProduct(body); // Call service method
  }

  @Get()
  getAllproducts() {
    return this.products.getAllproducts();
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
