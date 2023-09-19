import { InputType, OmitType } from '@nestjs/graphql';
import { ProductSaleslocation } from '../entities/productSalesLocation.entity';

@InputType()
export class ProductSalesLocationInput extends OmitType(
  ProductSaleslocation,
  ['id'],
  InputType,
) {}
