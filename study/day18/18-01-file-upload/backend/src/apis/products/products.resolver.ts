import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProductInput.input';
import { UpdateProductInput } from './dto/updateProductInput.input';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Resolver()
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product])
  fetchProducts() {
    return this.productsService.findAll();
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: String, //
  ) {
    return this.productsService.findOne({ productId });
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput, //
  ) {
    return this.productsService.create({ createProductInput });
  }

  // 수정하기
  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: String,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    // 판매완료 확인
    await this.productsService.checkSoldout({ productId });

    return this.productsService.update({ productId, updateProductInput });
  }

  @Mutation(() => Boolean)
  deleteProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productsService.delete({ productId });
  }
}
