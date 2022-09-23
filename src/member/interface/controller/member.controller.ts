import { Body, Controller, Logger, Post } from '@nestjs/common';
import { MemberRequest } from '../dto/member.request';
import { MemberResponse } from '../dto/member.response';
import { BaseResponse } from '../../../global/common/response/base.response';

@Controller('/members')
export class MemberController {
  private readonly logger = new Logger(MemberController.name);

  @Post('/member')
  async signup(@Body() request: MemberRequest): Promise<BaseResponse<MemberResponse>> {
    this.logger.debug(JSON.stringify(request));
    return null;
  }
}
