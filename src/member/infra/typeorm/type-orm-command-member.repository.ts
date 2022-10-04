import { Member } from '../../domain/entity/member.entity';
import { EntityRepository } from 'typeorm';
import { ICommandMemberRepository } from '../../domain/repository/command-member.repository';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(Member)
export class TypeOrmCommandMemberRepository extends BaseRepository<Member> implements ICommandMemberRepository {
  async existByLoginId(loginId: string): Promise<boolean> {
    return (await this.count({ loginId })) > 0;
  }
}
