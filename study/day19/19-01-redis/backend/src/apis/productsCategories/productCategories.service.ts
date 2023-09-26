import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/produtCategory.entity';

@Injectable()
export class ProductCategoriesService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}
  async create({ name }) {
    // 디비에 카테고리 등록
    const result = await this.productCategoryRepository.save({ name });
    console.log(result);

    return result;
  }
}
