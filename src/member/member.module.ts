import { Module } from '@nestjs/common';
import { MemberController } from './interface/controller/member.controller';
import { MemberService } from './application/service/member.service';
import { TypeOrmCommandMemberRepository } from './infra/typeorm/type-orm-command-member.repository';
import { Connection } from 'typeorm';
import { TypeOrmReadMemberRepository } from './infra/typeorm/read/type-orm-read-member.repository';

@Module({
  controllers: [MemberController],
  providers: [
    MemberService,
    { provide: 'ICommandMemberRepository', useFactory: connection => connection.getCustomRepository(TypeOrmCommandMemberRepository), inject: [Connection] },
    { provide: 'IReadMemberRepository', useFactory: connection => connection.getCustomRepository(TypeOrmReadMemberRepository), inject: [Connection] },
  ],
})
export class MemberModule {}
