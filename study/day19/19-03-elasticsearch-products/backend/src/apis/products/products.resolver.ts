import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProductInput.input';
import { UpdateProductInput } from './dto/updateProductInput.input';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Resolver()
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService, //

    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  // @Query(() => [Product])
  @Query(() => String)
  async fetchProducts() {
    // 엘라스틱서치 조회하기 연습
    const result = await this.elasticsearchService.search({
      index: 'myproduct04',
      query: {
        match_all: {}, //
        // match: { age: 17 }, age가 17인 데이터 다 갖고 오기
      },
    });

    console.log(JSON.stringify(result.hits.hits, null, '  '));
    // console.log(result.hits);
    return '엘라스틱서치 조회하기 연습중';
    // return this.productsService.findAll();
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: String, //
  ) {
    return this.productsService.findOne({ productId });
  }

  @Mutation(() => String)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput, //
  ) {
    // 엘라스틱서치 등록하기 연습
    this.elasticsearchService.create({
      id: 'myid',
      index: 'myproduct04',
      document: {
        ...createProductInput,
      },
    });
    return '엘라스틱서치 등록 연습중';
    // return this.productsService.create({ createProductInput });
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
