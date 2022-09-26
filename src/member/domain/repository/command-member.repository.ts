import { Member } from '../entity/member.entity';

export interface ICommandMemberRepository {
  save(member: Member): Promise<Member>;
}
