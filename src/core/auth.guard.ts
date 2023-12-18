import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;

    const authScope = this.reflector.get<string[]>(
      'authScope',
      context.getHandler(),
    );

    const isAuthHeader =
      headers.authorization && headers.authorization.startsWith('Bearer ');
    if (!isAuthHeader) {
      throw new UnauthorizedException('AUTH_HEADER_INVALID');
    }

    const token = headers.authorization.split(' ')[1];

    try {
      const jwtSecret = this.configService.get<string>('JWT_SECRET');
      if (!jwtSecret) {
        throw new Error('JWT secret key is not defined');
      }

      const decoded = jwt.verify(token, jwtSecret);
      request.user = decoded;

      if (authScope && authScope.includes('ALL')) {
        return true;
      }

      return !!decoded;
    } catch (error) {
      console.error('JWT Verification Error:', error);
      throw new UnauthorizedException('TOKEN_INVALID');
    }
  }
}
