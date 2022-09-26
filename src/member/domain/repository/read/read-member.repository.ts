import { MemberResponseDto } from '../../../interface/dto/member.response.dto';

export interface IReadMemberRepository {
  getMembers(): Promise<MemberResponseDto[] | null>;
}
