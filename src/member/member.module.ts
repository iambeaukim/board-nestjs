import { Module } from '@nestjs/common';
import { MemberController } from './interface/controller/member.controller';
import { MemberService } from './application/service/member.service';
import { MemberMysqlRepository } from './infra/mysql/member.mysql.repository';
import { Connection } from 'typeorm';

@Module({
  controllers: [MemberController],
  providers: [
    MemberService,
    { provide: 'IMemberRepository', useFactory: connection => connection.getCustomRepository(MemberMysqlRepository), inject: [Connection] },
  ],
})
export class MemberModule {}
