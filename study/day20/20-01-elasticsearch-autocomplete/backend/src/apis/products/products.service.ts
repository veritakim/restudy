import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from '../productsSalesLocations/entities/productSalesLocation.entity';
import { ProductTag } from '../productTags/entities/productTag.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationRepository: Repository<ProductSaleslocation>,
    @InjectRepository(ProductTag)
    private readonly productTagRepository: Repository<ProductTag>,
  ) {}

  findAll() {
    return this.productRepository.find({
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }

  findOne({ productId }) {
    return this.productRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }

  async create({ createProductInput }) {
    const { productSalesLocation, productCategoryId, productTags, ...product } =
      createProductInput;

    const locationResult = await this.productSaleslocationRepository.save({
      ...productSalesLocation,
    });

    // tag 저장시키기
    const tagsResult = [];

    for (let i = 0; i < productTags.length; i++) {
      const tag = productTags[i].replace('#', '');
      // 우선 있는지 확인
      const prevTag = await this.productTagRepository.findOne({
        where: { name: tag },
      });

      if (prevTag) {
        tagsResult.push(prevTag);
      } else {
        const result = await this.productTagRepository.save({
          name: tag,
        });

        tagsResult.push(result);
      }
    }

    // 찍어보기
    // console.log('=====================');
    // console.log('태그는 : ' + tagsResult);
    // console.log('=====================');

    const result = await this.productRepository.save({
      ...product,
      productSaleslocation: locationResult,
      productCategory: { id: productCategoryId },
      productTags: tagsResult,
    });

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
    const result = await this.productRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}
