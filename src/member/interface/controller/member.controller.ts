import { Body, Controller, Get, Inject, Logger, Post } from '@nestjs/common';
import { SignupMemberRequestDto } from '../dto/signup-member.request.dto';
import { MemberResponseDto } from '../dto/member.response.dto';
import { BaseResponse } from '../../../global/common/response/base.response';
import { MemberService } from '../../application/service/member.service';
import { IReadMemberRepository } from '../../domain/repository/read/read-member.repository';

@Controller('/members')
export class MemberController {
  private readonly logger = new Logger(MemberController.name);

  constructor(
    private readonly memberService: MemberService,

    @Inject('IReadMemberRepository')
    private readonly readMemberRepository: IReadMemberRepository,
  ) {}

  @Post('/member')
  async signup(@Body() request: SignupMemberRequestDto): Promise<BaseResponse<MemberResponseDto>> {
    this.logger.debug(JSON.stringify(request));
    return BaseResponse.successBaseResponse(await this.memberService.signup(request.toServiceDto()));
  }

  @Get('/')
  async getMembers(): Promise<BaseResponse<MemberResponseDto[]>> {
    return BaseResponse.successBaseResponse(await this.readMemberRepository.getMembers());
  }
}
