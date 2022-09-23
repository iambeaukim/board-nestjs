import { IsNotEmpty } from 'class-validator';

export class MemberRequest {
  @IsNotEmpty()
  loginId: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  nickname: string;

  public toEntity() {}
}
