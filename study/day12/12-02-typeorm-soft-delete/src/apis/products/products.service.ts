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
    const result = await this.productRepository.save({
      ...createProductInput,
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

  async delete({ productId }) {
    // 1. 실제로 삭제하는 방법
    // const result = await this.productRepository.delete({ id: productId });
    // return result.affected ? true : false;
    //
    // 2. 소프트 삭제 - isDeleted column 사용
    // this.productRepository.update({ id: productId }, { isDeleted: true });

    // 3. 소프트 삭제 - deletedAt을 저장
    // this.productRepository.update({ id: productId }, { deletedAt: new Date() });

    // 4. 소프트 삭제 - typeorm에서 제공
    // 5와 다른 점. 아이디로만 삭제 가능
    // this.productRepository.softRemove({ id: productId });

    // 5. 소프트 삭제 -
    // 4와 다른 점 다른 것으로도 삭제 가능 이름으로라던지
    const result = await this.productRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}
