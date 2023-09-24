import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './entities/produtCategory.entity';
import { ProductCategoriesResolver } from './productCategories.resolver';
import { ProductCategoriesService } from './productCategories.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductCategory, //
    ]),
  ],
  providers: [
    ProductCategoriesResolver, //
    ProductCategoriesService,
  ],
})
export class ProductCategoriesModule {}
