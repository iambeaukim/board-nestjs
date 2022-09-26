import { Module } from '@nestjs/common';
import { MemberController } from './interface/controller/member.controller';
import { MemberService } from './application/service/member.service';
import { MemberMysqlRepository } from './infra/mysql/member.mysql.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './domain/entity/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  controllers: [MemberController],
  providers: [MemberService, MemberMysqlRepository],
})
export class MemberModule {}
