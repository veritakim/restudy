import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProductInput.input';
import { UpdateProductInput } from './dto/updateProductInput.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product])
  fetchProducts() {
    return this.productService.findAll();
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: String, //
  ) {
    return this.productService.findOne({ productId });
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput, //
  ) {
    return this.productService.create({ createProductInput });
  }

  // 수정하기
  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: String,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    // 판매완료 확인
    await this.productService.checkSoldout({ productId });

    return this.productService.update({ productId, updateProductInput });
  }
}
