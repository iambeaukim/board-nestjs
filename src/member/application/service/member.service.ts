import { Injectable } from '@nestjs/common';
import { MemberServiceDto } from '../dto/member.service.dto';
import { MemberMysqlRepository } from '../../infra/mysql/member.mysql.repository';

@Injectable()
export class MemberService {
  constructor(private memberRepository: MemberMysqlRepository) {}

  async signup(memberServiceDto: MemberServiceDto): Promise<MemberServiceDto> {
    await this.memberRepository.save(memberServiceDto.toEntity());
    return memberServiceDto;
  }
}
