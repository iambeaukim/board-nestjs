import { Body, Controller, Logger, Post } from '@nestjs/common';
import { SignupMemberRequest } from '../dto/signup-member.request';
import { MemberResponse } from '../dto/member.response';
import { BaseResponse } from '../../../global/common/response/base.response';
import { MemberService } from '../../application/service/member.service';

@Controller('/members')
export class MemberController {
  private readonly logger = new Logger(MemberController.name);

  constructor(private readonly memberService: MemberService) {}

  @Post('/member')
  async signup(@Body() request: SignupMemberRequest): Promise<BaseResponse<MemberResponse>> {
    this.logger.debug(JSON.stringify(request));
    return BaseResponse.successBaseResponse(await this.memberService.signup(request.toServiceDto()));
  }
}
