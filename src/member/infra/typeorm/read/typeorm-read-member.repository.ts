import { EntityRepository } from 'typeorm';
import { IReadMemberRepository } from '../../../domain/repository/read/read-member.repository';
import { Member } from '../../../domain/entity/member.entity';
import { MemberResponseDto } from '../../../interface/dto/member.response.dto';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { plainToInstance } from 'class-transformer';
import { SearchMemberRequestDto } from '../../../interface/dto/search-member.request.dto';
import { Page } from '../../../../global/common/dto/page';

@EntityRepository(Member)
export class TypeormReadMemberRepository extends BaseRepository<Member> implements IReadMemberRepository {
  async getMembers(param: SearchMemberRequestDto): Promise<any | null> {
    const queryBuilder = this.createQueryBuilder('member');

    if (param.pageNumber && param.pageSize) {
      queryBuilder.offset(param.getOffset());
      queryBuilder.limit(param.getLimit());
      const results = await queryBuilder.disableEscaping().getManyAndCount();

      return new Page<MemberResponseDto>(
        results[1],
        param.pageSize,
        param.pageNumber,
        plainToInstance(MemberResponseDto, results[0], { excludeExtraneousValues: true }),
      );
    }

    const results = await queryBuilder.disableEscaping().getMany();

    return plainToInstance(MemberResponseDto, results, { excludeExtraneousValues: true });
  }
}
