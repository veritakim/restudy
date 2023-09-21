import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointsTrancsactionsResolver } from './pointsTransactions.resolver';
import { PointsTrancsactionsService } from './pointsTransactions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PointTransaction, //
      User,
    ]),
  ],

  providers: [
    PointsTrancsactionsResolver, //
    PointsTrancsactionsService,
  ],
})
export class PointsTrancsactionsModule {}
