import { Module } from '@nestjs/common';
import { MemberController } from './interface/controller/member.controller';
import { MemberService } from './application/service/member.service';
import { MemberMysqlRepository } from './infra/mysql/member.mysql.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MemberMysqlRepository])],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
