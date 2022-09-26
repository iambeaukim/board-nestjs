import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { MemberServiceDto } from '../dto/member.service.dto';
import { ICommandMemberRepository } from '../../domain/repository/command-member.repository';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MemberService {
  constructor(
    @Inject('ICommandMemberRepository')
    private memberRepository: ICommandMemberRepository,
  ) {}

  @Transactional()
  async signup(memberServiceDto: MemberServiceDto): Promise<MemberServiceDto> {
    const memberEntity = memberServiceDto.toEntity();

    if (await this.memberRepository.existByLoginId(memberEntity.loginId)) throw new HttpException('duplicated loginId', HttpStatus.CONFLICT);

    await this.memberRepository.save(memberEntity);
    return plainToInstance(MemberServiceDto, memberEntity);
  }
}
