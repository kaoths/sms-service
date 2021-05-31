import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { RequestOtpDto, VerifyOtpDto } from './otp.dto';
import { SmsService } from '../sms/sms.service';

@Injectable()
export class OtpService {
  private readonly otpSecret: string;
  private readonly expiredIn: number;

  constructor(private readonly configService: ConfigService, private readonly smsService: SmsService) {
    this.otpSecret = this.configService.get<string>('otp.secret');
    this.expiredIn = this.configService.get<number>('otp.expiredInMinutes');
  }

  private generateRefCode(): string {
    const code = Math.random().toString(16).slice(-6);
    return code.toUpperCase();
  }

  private getOtp(ref: string): string {
    const hmac = crypto.createHmac('sha256', this.otpSecret + ref);
    const data = Math.floor(Date.now() / (this.expiredIn * 60 * 1000)).toString();
    const hex = hmac.update(data).digest('hex').slice(-16);
    return parseInt(hex, 16).toString().padStart(6, '0').slice(0, 6);
  }

  async requestOtp({ phoneNumber }: RequestOtpDto) {
    const ref = this.generateRefCode();
    const otp = this.getOtp(ref);
    await this.smsService.sendSms({
      to: phoneNumber,
      message: `รหัส OTP คือ ${otp} (ref: ${ref}) หมดอายุใน ${this.expiredIn} นาที`,
    });
    return {
      phoneNumber,
      ref,
    };
  }

  async verify(dto: VerifyOtpDto): Promise<{ verified: boolean }> {
    const correctOtp = this.getOtp(dto.ref);
    if (dto.otp === correctOtp) {
      return { verified: true };
    } else {
      throw new BadRequestException({
        message: 'Incorrect OTP',
        verified: false,
      });
    }
  }
}
