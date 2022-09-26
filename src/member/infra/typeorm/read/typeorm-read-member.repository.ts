import { EntityRepository } from 'typeorm';
import { IReadMemberRepository } from '../../../domain/repository/read/read-member.repository';
import { Member } from '../../../domain/entity/member.entity';
import { MemberResponseDto } from '../../../interface/dto/member.response.dto';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { plainToInstance } from 'class-transformer';

@EntityRepository(Member)
export class TypeormReadMemberRepository extends BaseRepository<Member> implements IReadMemberRepository {
  //
  async getMembers(): Promise<MemberResponseDto[] | null> {
    const members = await this.createQueryBuilder('member')
      .select('member.id', 'id')
      .addSelect('member.login_id', 'login_id')
      .addSelect('member.nickname', 'nickname')
      .addSelect('member.created_at', 'created_at')
      .addSelect('member.updated_at', 'updated_at')
      .getRawMany();

    return plainToInstance(MemberResponseDto, members);
  }
}
