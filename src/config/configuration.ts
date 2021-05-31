export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  node_env: process.env.NODE_ENV,
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
  },
  eght: {
    subAccountId: process.env.EGHT_SUB_ACCOUNT_ID,
    apiKey: process.env.EGHT_API_KEY,
  },
  otp: {
    secret: process.env.OTP_SECRET,
    expiredInMinutes: parseInt(process.env.OTP_EXPIRED_IN_MINUTES),
  },
});
