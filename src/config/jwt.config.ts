import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  jwtToken: process.env.JWT_TOKEN,
}));
