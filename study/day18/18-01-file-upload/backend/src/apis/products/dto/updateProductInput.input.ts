import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './createProductInput.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {}
