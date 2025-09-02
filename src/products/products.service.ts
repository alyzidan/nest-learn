import { Injectable, NotFoundException } from '@nestjs/common';
import { createProductDto } from './dtos/create-products.dto';
import { updateProductDto } from './dtos/update-products.dto';
import { Product } from './entities/product.entitiy';
import { Like, Repository } from 'typeorm';
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
  async getAllproducts(title?: string, limit?: number, offset?: number) {
    console.log(title, limit, offset);
    const filters = {
      where: {
        ...(title ? { title: Like(`%${title}%`) } : {}),
      },
      ...(limit ? { take: limit } : {}),
      ...(offset ? { skip: offset } : {}),
    };
    return this.productRepository.find(filters);
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
