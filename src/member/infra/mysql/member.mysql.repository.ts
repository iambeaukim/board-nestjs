import { Member } from '../../domain/entity/member.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Member)
export class MemberMysqlRepository extends Repository<Member> {}
