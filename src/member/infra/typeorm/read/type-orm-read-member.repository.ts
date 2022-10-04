import { EntityRepository } from 'typeorm';
import { IReadMemberRepository } from '../../../domain/repository/read/read-member.repository';
import { Member } from '../../../domain/entity/member.entity';
import { MemberResponseDto } from '../../../interface/dto/member.response.dto';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { SearchMemberRequestDto } from '../../../interface/dto/search-member.request.dto';
import { Page } from '../../../../global/common/dto/page';
import { MemberServiceDto } from '../../../application/dto/member.service.dto';

@EntityRepository(Member)
export class TypeOrmReadMemberRepository extends BaseRepository<Member> implements IReadMemberRepository {
  async getMembers(param: SearchMemberRequestDto): Promise<any | null> {
    const queryBuilder = this.createQueryBuilder('member')
      .select('member.id', 'id')
      .addSelect('member.login_id', 'loginId')
      .addSelect('member.password', 'password')
      .addSelect('member.nickname', 'nickname')
      .addSelect('member.created_at', 'createdAt')
      .addSelect('member.updated_at', 'updatedAt')
      .addSelect('member.is_active', 'isActive');

    if (param.pageNumber && param.pageSize) {
      const totalCount = await queryBuilder.disableEscaping().getCount();
      queryBuilder.offset(param.getOffset());
      queryBuilder.limit(param.getLimit());
      const results = await queryBuilder.disableEscaping().getRawMany<MemberServiceDto>();

      return new Page<MemberResponseDto>(
        totalCount,
        param.pageSize,
        param.pageNumber,
        results.map(r => MemberResponseDto.fromServiceDto(r)),
      );
    }

    const results = await queryBuilder.disableEscaping().getRawMany<MemberServiceDto>();
    return results.map(r => MemberResponseDto.fromServiceDto(r));
  }
}
