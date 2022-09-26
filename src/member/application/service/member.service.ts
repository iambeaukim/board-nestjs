import { Injectable } from '@nestjs/common';
import { MemberServiceDto } from '../dto/member.service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from '../../domain/entity/member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  async signup(memberServiceDto: MemberServiceDto): Promise<MemberServiceDto> {
    await this.memberRepository.save(memberServiceDto.toEntity());
    return memberServiceDto;
  }
}
