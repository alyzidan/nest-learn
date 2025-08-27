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
  createProduct(
    @Body()
    body: createProductDto,
  ) {
    console.log(body);
    this.createProduct(body);
  }

  @Get()
  getAllproducts() {
    return [
      ...this.products.getAllproducts(),
      ...this.usersService.getAllUsers(),
    ];
  }
  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() body: updateProductDto) {
    this.updateProduct(id, body);
  }
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    this.products.deleteProduct(id);
  }
  @Get(':id')
  getProductById(@Param('id', ParseIntPipe) id: string) {
    this.products.getProductById(id);
  }
}
