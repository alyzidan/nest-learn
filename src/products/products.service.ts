import { Injectable, NotFoundException } from '@nestjs/common';
import { createProductDto } from './dtos/create-products.dto';
import { updateProductDto } from './dtos/update-products.dto';
type ProductType = {
  id: number;
  name: string;
  description: string;
  price: number;
};
@Injectable()
export class ProductsService {
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
  createProduct({ name, description, price }: createProductDto) {
    const newProduct: ProductType = {
      id: this.products.length + 1,
      name,
      description,
      price,
    };
    this.products.push(newProduct);
  }
  /**
   *
   * @returns
   * get all products
   */
  getAllproducts(): ProductType[] {
    return this.products;
  }
  updateProduct(id: string, body: updateProductDto) {
    const result = this.products.map((product) =>
      product.id === parseInt(id) ? { ...product, ...body } : product,
    );
    this.products = result;
    if (!result) {
      throw new NotFoundException('Product not found');
    }
  }
  deleteProduct(id: string) {
    const result = this.products.filter(
      (product) => product.id !== parseInt(id),
    );
    if (!result) {
      throw new NotFoundException('Product not found');
    }
    return result;
  }

  getProductById(id: string): ProductType | undefined {
    const result: ProductType | undefined = this.products.find(
      (product) => product.id === parseInt(id),
    );

    return result;
  }
}
