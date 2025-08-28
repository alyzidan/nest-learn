import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entitiy';
@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService],
  imports: [forwardRef(() => UsersModule), TypeOrmModule.forFeature([Product])],
})
export class ProductsModule {}
