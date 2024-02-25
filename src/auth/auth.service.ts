import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, pass: string) {
    const payload = await this.usersService.findOne(email);

    if (!payload || payload.password !== pass) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = payload;

    return {
      access_token: this.jwtService.sign(result),
    };
  }

  // async refreshTokens(userId: string, refreshToken: string) {
  //   const user = await this.usersService.findOne(userId);
  //   if (!user || !user.refreshToken)
  //     throw new ForbiddenException('Access Denied');
  //   const refreshTokenMatches = await argon2.verify(
  //     user.refreshToken,
  //     refreshToken,
  //   );
  //   if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
  //   const tokens = await this.getTokens(user.id, user.username);
  //   await this.updateRefreshToken(user.id, tokens.refreshToken);
  //   return tokens;
  // }
  
}
