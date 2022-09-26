import { Member } from '../../domain/entity/member.entity';
import { EntityRepository, Repository } from 'typeorm';
import { IMemberRepository } from '../../domain/repository/member.repository';

@EntityRepository(Member)
export class TypeormMemberRepository extends Repository<Member> implements IMemberRepository {}
