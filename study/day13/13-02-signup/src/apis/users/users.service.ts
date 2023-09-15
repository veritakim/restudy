import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpExceptionFilter } from 'src/commons/filter/http-exception.filter';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({ email, password, name, age }) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (user) throw new ConflictException('이미 등록된 이메일입니다');

    return this.userRepository.save({
      email, //
      password,
      name,
      age,
    });
  }
}
