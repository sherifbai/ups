import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  global: true,
  secret: process.env.JWT_SECRET ?? 'secret',
  signOptions: { expiresIn: '24h' },
};
