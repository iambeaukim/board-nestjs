import { Inject, Injectable } from '@nestjs/common';
import { MemberServiceDto } from '../dto/member.service.dto';
import { ICommandMemberRepository } from '../../domain/repository/command-member.repository';

@Injectable()
export class MemberService {
  constructor(
    @Inject('ICommandMemberRepository')
    private memberRepository: ICommandMemberRepository,
  ) {}

  async signup(memberServiceDto: MemberServiceDto): Promise<MemberServiceDto> {
    await this.memberRepository.save(memberServiceDto.toEntity());
    return memberServiceDto;
  }
}
