import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';

@Injectable()
export class PointsTrancsactionsService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointTransctionRepository: Repository<PointTransaction>, //

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly dataSource: DataSource,
  ) {}

  async create({ impUid, amount, user: _user }) {
    const queryRunner = this.dataSource.createQueryRunner();
    // db와 연결 시작
    await queryRunner.connect();

    // ================== start transaction ==================
    await queryRunner.startTransaction();
    // =======================================================

    try {
      const pointTransaction = this.pointTransctionRepository.create({
        impUid,
        amount,
        user: _user,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });
      // await this.pointTransctionRepository.save(pointTransaction);
      await queryRunner.manager.save(pointTransaction);

      // 2. 유저의 돈 찾아오기
      const user = await this.userRepository.findOne({
        where: { id: _user.id },
      });

      // 3. 유저의 돈 업데이트
      const updatedUser = this.userRepository.create({
        ...user,
        point: user.point + amount,
      });
      await queryRunner.manager.save(updatedUser);

      // ============== commit 성공 확정 ==================
      await queryRunner.commitTransaction();
      // ==================================================

      // 4. 최종결과 총가격 프엔에 돌려주기
      return pointTransaction;
    } catch (error) {
      // ============== roll back ==================
      await queryRunner.rollbackTransaction();
      // ==================================================
    } finally {
      // ============== 연결 해제 ==================
      await queryRunner.release();
      // ==================================================
    }
  }
}
