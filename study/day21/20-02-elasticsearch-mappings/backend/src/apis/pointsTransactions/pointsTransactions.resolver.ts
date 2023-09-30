import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { type } from 'os';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointsTrancsactionsService } from './pointsTransactions.service';

@Resolver()
export class PointsTrancsactionsResolver {
  constructor(
    private readonly pointsTransactionsService: PointsTrancsactionsService, //
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointTransaction)
  createPointTransaction(
    @Args('impUid') impUid: string, //
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @Context() context: IContext,
  ) {
    console.log('createPoint 들어옴');
    const user = context.req.user;
    return this.pointsTransactionsService.create({ impUid, amount, user });
  }
}
