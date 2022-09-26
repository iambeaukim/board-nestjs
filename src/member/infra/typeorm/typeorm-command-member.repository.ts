import { Member } from '../../domain/entity/member.entity';
import { EntityRepository, Repository } from 'typeorm';
import { ICommandMemberRepository } from '../../domain/repository/command-member.repository';

@EntityRepository(Member)
export class TypeormCommandMemberRepository extends Repository<Member> implements ICommandMemberRepository {}
