import { Member } from '../entity/member.entity';

export interface ICommandMemberRepository {
  save(member: Member): Promise<Member>;
  existByLoginId(loginId: string): Promise<boolean>;
}
