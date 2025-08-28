import { Injectable, NotFoundException } from '@nestjs/common';
import { createProductDto } from './dtos/create-products.dto';
import { updateProductDto } from './dtos/update-products.dto';
import { Product } from './entities/product.entitiy';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
type ProductType = {
  id: number;
  name: string;
  description: string;
  price: number;
};
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  private products: ProductType[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Product 1 description',
      price: 100,
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Product 2 description',
      price: 200,
    },
  ];
  /**
   *
   * @param param0 createProduct
   */
  async createProduct(dto: createProductDto) {
    const newProduct = this.productRepository.create(dto);
    return await this.productRepository.save(newProduct);
  }
  /**
   *
   * @returns
   * get all products
   */
  async getAllproducts() {
    return this.productRepository.find();
  }
  async updateProduct(id: string, body: updateProductDto) {
    const product = await this.productRepository.findOneBy({
      id: parseInt(id),
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    this.productRepository.merge(product, body);
    return this.productRepository.save(product);
  }
  async deleteProduct(id: string) {
    const product = await this.productRepository.findOneBy({
      id: parseInt(id),
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return this.productRepository.remove(product);
  }

  async getProductById(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    console.log(product);
    return product;
  }
}
