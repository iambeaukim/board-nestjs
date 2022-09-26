import { Inject, Injectable } from '@nestjs/common';
import { MemberServiceDto } from '../dto/member.service.dto';
import { IMemberRepository } from '../../domain/repository/member.repository';

@Injectable()
export class MemberService {
  constructor(
    @Inject('IMemberRepository')
    private memberRepository: IMemberRepository,
  ) {}

  async signup(memberServiceDto: MemberServiceDto): Promise<MemberServiceDto> {
    await this.memberRepository.save(memberServiceDto.toEntity());
    return memberServiceDto;
  }
}
