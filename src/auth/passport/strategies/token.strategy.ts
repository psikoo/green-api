import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { StrategyOptionsWithoutRequest } from 'passport-jwt';

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy, 'token') {
  constructor(private configService: ConfigService) {
    super({} as StrategyOptionsWithoutRequest);
  }

  validate(token: string) {
    if(token !== this.configService.get<string>('TOKEN')) {
      throw new UnauthorizedException('Invalid token');
    }
    return { username: 'admin', role: 0 };
  }
}
