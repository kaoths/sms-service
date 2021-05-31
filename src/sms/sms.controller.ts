import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SendSmsDto } from './sms.dto';

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('send')
  @HttpCode(200)
  async sendSms(@Body() dto: SendSmsDto): Promise<void> {
    await this.smsService.sendSms(dto);
  }
}
