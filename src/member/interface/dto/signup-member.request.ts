import { IsEmail, IsNotEmpty } from 'class-validator';
import { MemberServiceDto } from '../../application/dto/member.service.dto';

export class SignupMemberRequest {
  @IsEmail()
  @IsNotEmpty()
  loginId: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  nickname: string;

  public toServiceDto(): MemberServiceDto {
    const memberServiceDto = new MemberServiceDto();
    memberServiceDto.loginId = this.loginId;
    memberServiceDto.password = this.password;
    memberServiceDto.nickname = this.nickname;
    return memberServiceDto;
  }
}
