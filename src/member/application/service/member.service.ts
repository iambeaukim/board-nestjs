import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { MemberServiceDto } from '../dto/member.service.dto';
import { ICommandMemberRepository } from '../../domain/repository/command-member.repository';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class MemberService {
  constructor(
    @Inject('ICommandMemberRepository')
    private memberRepository: ICommandMemberRepository,
  ) {}

  @Transactional()
  async signup(memberServiceDto: MemberServiceDto): Promise<MemberServiceDto> {
    const member = memberServiceDto.toEntity();

    if (await this.memberRepository.existByLoginId(member.loginId)) throw new HttpException('duplicated loginId', HttpStatus.CONFLICT);

    await this.memberRepository.save(member);

    return MemberServiceDto.fromEntity(member);
  }
}
