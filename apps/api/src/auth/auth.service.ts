import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshDto } from './dto/refresh.dto';

type JwtPayload = {
  sub: string;
  email: string;
  tenant_id: string;
  role: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  // SKELETON: no real DB create yet
  async register(dto: RegisterDto) {
    const payload: JwtPayload = {
      sub: 'skeleton-user-id',
      email: dto.email,
      tenant_id: dto.tenantId,
      role: 'USER',
    };

    return this.issueTokens(payload);
  }

  // SKELETON: accepts any email/password (no DB check yet)
  async login(dto: LoginDto) {
    const payload: JwtPayload = {
      sub: 'skeleton-user-id',
      email: dto.email,
      tenant_id: 'skeleton-tenant-id',
      role: 'USER',
    };

    return this.issueTokens(payload);
  }

  async refresh(dto: RefreshDto) {
    const refreshSecret =
      this.config.get<string>('JWT_REFRESH_SECRET') || 'dev_refresh_secret';

    try {
      const decoded = await this.jwt.verifyAsync<JwtPayload>(dto.refreshToken, {
        secret: refreshSecret,
      });

      // issue a new access token (and optionally rotate refresh later)
      const accessToken = await this.jwt.signAsync({
        sub: decoded.sub,
        email: decoded.email,
        tenant_id: decoded.tenant_id,
        role: decoded.role,
      });

      return { accessToken };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async issueTokens(payload: JwtPayload) {
    const refreshSecret =
      this.config.get<string>('JWT_REFRESH_SECRET') || 'dev_refresh_secret';

    const refreshTtl = Number(this.config.get('JWT_REFRESH_TTL') || 604800); // seconds

    const accessToken = await this.jwt.signAsync(payload);

    const refreshToken = await this.jwt.signAsync(payload, {
      secret: refreshSecret,
      expiresIn: refreshTtl,
    });

    return { accessToken, refreshToken };
  }
}
