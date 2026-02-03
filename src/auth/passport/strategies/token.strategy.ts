import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { UniqueTokenStrategy } from 'passport-unique-token';

@Injectable()
export class TokenStrategy extends PassportStrategy(UniqueTokenStrategy, "header-token") {
  constructor(private configService: ConfigService) {
    super({ tokenHeader: "token" });
  }

  async validate(token: string) {
    if (token !== this.configService.get<string>("TOKEN")) {
      throw new UnauthorizedException("Invalid token");
    }
    return { username: "admin", role: 0 };
  }
}