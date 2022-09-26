import { Module } from '@nestjs/common';
import { MemberController } from './interface/controller/member.controller';
import { MemberService } from './application/service/member.service';
import { TypeormCommandMemberRepository } from './infra/typeorm/typeorm-command-member.repository';
import { Connection } from 'typeorm';
import { TypeormReadMemberRepository } from './infra/typeorm/read/typeorm-read-member.repository';

@Module({
  controllers: [MemberController],
  providers: [
    MemberService,
    { provide: 'ICommandMemberRepository', useFactory: connection => connection.getCustomRepository(TypeormCommandMemberRepository), inject: [Connection] },
    { provide: 'IReadMemberRepository', useFactory: connection => connection.getCustomRepository(TypeormReadMemberRepository), inject: [Connection] },
  ],
})
export class MemberModule {}
