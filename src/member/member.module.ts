import { Module } from '@nestjs/common';
import { MemberController } from './interface/controller/member.controller';
import { MemberService } from './application/service/member.service';
import { TypeormMemberRepository } from './infra/typeorm/typeorm-member.repository';
import { Connection } from 'typeorm';

@Module({
  controllers: [MemberController],
  providers: [
    MemberService,
    { provide: 'IMemberRepository', useFactory: connection => connection.getCustomRepository(TypeormMemberRepository), inject: [Connection] },
  ],
})
export class MemberModule {}
