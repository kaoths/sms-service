import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import * as twilio from 'twilio';
import { SendSmsDto } from './sms.dto';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class SmsService {
  // private readonly twilioClient: ReturnType<typeof twilio>;
  private readonly eghtApiKey: string;
  private readonly eghtSubAccountId: string;
  private readonly eghtUrl: string;
  private readonly config: AxiosRequestConfig;

  constructor(private readonly configService: ConfigService, private readonly httpService: HttpService) {
    // this.twilioClient = twilio(
    //   this.configService.get<string>('twilio.accountSid'),
    //   this.configService.get<string>('twilio.authToken')
    // );
    this.eghtApiKey = this.configService.get<string>('eght.apiKey');
    this.eghtSubAccountId = this.configService.get<string>('eght.subAccountId');
    this.eghtUrl = `https://sms.8x8.com/api/v1/subaccounts/${this.eghtSubAccountId}/messages`;
    this.config = {
      headers: { Authorization: `Bearer ${this.eghtApiKey}` },
    };
  }

  async sendSms(dto: SendSmsDto): Promise<void> {
    const destination = '+66' + dto.to.slice(-9);
    const body = {
      source: '',
      destination,
      text: dto.message,
      encoding: 'AUTO',
    };
    await this.httpService.post(this.eghtUrl, body, this.config).toPromise();
  }
}
