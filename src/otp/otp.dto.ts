import { Matches } from 'class-validator';

export class RequestOtpDto {
  @Matches(/^0[1-9]\d{8}$/)
  phoneNumber: string;
}

export class VerifyOtpDto {
  @Matches(/\d{6}/)
  otp: string;

  @Matches(/[0-9A-z]{6}/)
  ref: string;
}

export class ResponseOtpDto {
  phoneNumber: string;
  ref: string;
}
