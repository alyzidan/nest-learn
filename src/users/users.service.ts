import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => ProductsService))
    private readonly products: ProductsService,
  ) {}
  getAllUsers() {
    // return this.products.getAllproducts();
    return [];
  }
}
