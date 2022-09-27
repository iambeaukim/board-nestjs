import { SearchMemberRequestDto } from '../../../interface/dto/search-member.request.dto';

export interface IReadMemberRepository {
  getMembers(param: SearchMemberRequestDto): Promise<any | null>;
}
