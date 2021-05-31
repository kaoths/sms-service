import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { OtpService } from './otp.service';
import { RequestOtpDto, ResponseOtpDto, VerifyOtpDto } from './otp.dto';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('request')
  @HttpCode(200)
  async requestOtp(@Body() dto: RequestOtpDto): Promise<ResponseOtpDto> {
    return this.otpService.requestOtp(dto);
  }

  @Post('verify')
  @HttpCode(200)
  async verifyOtp(@Body() dto: VerifyOtpDto): Promise<{ verified: boolean }> {
    return this.otpService.verify(dto);
  }
}
