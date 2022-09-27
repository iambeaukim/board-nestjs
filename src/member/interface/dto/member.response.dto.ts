import { Expose } from 'class-transformer';

export class MemberResponseDto {
  @Expose()
  id: number;

  @Expose()
  loginId: string;

  @Expose()
  nickname: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
