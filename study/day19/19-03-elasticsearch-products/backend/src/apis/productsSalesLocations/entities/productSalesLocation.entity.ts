import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
@ObjectType()
export class ProductSaleslocation {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  address: string;

  @Column()
  @Field(() => String)
  addressDetail: string;

  @Column()
  @Field(() => Float)
  lat: number;

  @Column()
  @Field(() => Float)
  lng: number;

  @Column()
  @Field(() => Date)
  meetingTime: Date;
}
