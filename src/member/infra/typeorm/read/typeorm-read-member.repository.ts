import { EntityRepository, Repository } from 'typeorm';
import { IReadMemberRepository } from '../../../domain/repository/read/read-member.repository';
import { Member } from '../../../domain/entity/member.entity';
import { MemberResponseDto } from '../../../interface/dto/member.response.dto';

@EntityRepository(Member)
export class TypeormReadMemberRepository extends Repository<Member> implements IReadMemberRepository {
  getMembers(): Promise<MemberResponseDto[] | null> {
    return this.find();
  }
}
