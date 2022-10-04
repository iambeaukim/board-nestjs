import { Expose } from 'class-transformer';
import { LocalDateTime } from '@js-joda/core';
import { MemberServiceDto } from '../../application/dto/member.service.dto';

export class MemberResponseDto {
  @Expose()
  id: number;

  @Expose()
  loginId: string;

  @Expose()
  nickname: string;

  @Expose()
  createdAt: LocalDateTime;

  @Expose()
  updatedAt: LocalDateTime;

  public static fromServiceDto(serviceDto: MemberServiceDto): MemberResponseDto {
    const responseDto = new MemberResponseDto();
    responseDto.id = serviceDto.id;
    responseDto.loginId = serviceDto.loginId;
    responseDto.nickname = serviceDto.nickname;
    responseDto.createdAt = serviceDto.createdAt;
    responseDto.updatedAt = serviceDto.updatedAt;
    return responseDto;
  }
}
