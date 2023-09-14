import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async findAll() {
    return await this.productRepository.find();
  }

  async findOne({ productId }) {
    return await this.productRepository.findOne({ where: { id: productId } });
  }

  async create({ createProductInput }) {
    // 디비에 카테고리 등록
    const result = await this.productRepository.save({
      ...createProductInput,

      // name: createProductInput.name,
      // description: createProductInput.description,
      // price: createProductInput.price,
    });
    console.log(result);

    return result;
  }

  async update({ productId, updateProductInput }) {
    const myProduct = await this.productRepository.findOne({
      where: { id: productId }, //
    });

    const result = this.productRepository.save({
      ...myProduct,
      id: productId,
      ...updateProductInput,
    });

    return result;
  }

  async checkSoldout({ productId }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
  }
}
