import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class SendSmsDto {
  @Matches(/^0[1-9]\d{8}$/)
  to: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
