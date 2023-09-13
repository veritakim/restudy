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
export class ProductService {
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
    // 수정할때
    // await this.productRepository.update(
    //   { id: productId },
    //   { ...updateProductInput },
    // );

    // 수정 후 결과값까지 받기 save
    // updateInput에 price밖에 없다면? 해결방법 : 기존 값을 불러서 넣어준다

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

    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }

    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
    }
  }
}
