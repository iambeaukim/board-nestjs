import { Member } from '../../domain/entity/member.entity';

export class MemberServiceDto {
  id: number;

  loginId: string;

  password: string;

  nickname: string;

  createdAt: Date;

  updatedAt: Date;

  isActive: boolean;

  public toEntity(): Member {
    const member = new Member();
    member.loginId = this.loginId;
    member.password = this.password;
    member.nickname = this.nickname;
    return member;
  }
}
