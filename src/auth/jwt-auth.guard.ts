import { JwtService } from '@nestjs/jwt';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      console.error('Authorization header is missing');
      return false;
    }

    const token = authHeader.split(' ')[1];

    try {
      const user = this.jwtService.verify(token);
      console.log('Decoded JWT:', user); // Add this line
      request.user = {
        id: user.sub, // Map `sub` to `id`
        username: user.username,
        nickname: user.nickname,
      };
      return true;
    } catch (error) {
      console.error('JWT verification failed:', error, {
        message: error.message,
        expiredAt: error.expiredAt,
      });
      return false;
    }
  }
}
