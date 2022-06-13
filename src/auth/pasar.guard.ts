import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PasarGuard implements CanActivate {

  constructor(private reflector: Reflector,
    private configService: ConfigService) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const rolesAuthorized = this.configService.get<string>('configuration.auth.roles')
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    try {
      if (roles.includes(rolesAuthorized)) {
        return true;
      }
    } finally {
      const request = context.switchToHttp().getRequest<Request>();
      const authHeader = request.header("role")
      const isAuth = authHeader === rolesAuthorized
      if (!isAuth) {
        throw new UnauthorizedException("Incorrect role")
      }
      return true
    }



  }
}
