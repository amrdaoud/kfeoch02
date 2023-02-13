import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { RefreshTokenService } from '../app-services/refresh-token.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private refreshTokenService: RefreshTokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!this.isSecured(request)) {
      return next.handle(request);
    }
    return this.refreshTokenService.handleRequest(request, next);
  }
  private isSecured(request: HttpRequest<unknown>): boolean {
    return !(request.url.endsWith('office-login') ||
              request.url.endsWith('admin-login') ||
              request.url.endsWith('refresh-token') ||
              (request.method === 'GET' && request.url.includes('dictionary/'))
              || (request.method === 'GET' && request.url.includes('site/'))
              || (request.method === 'POST' && request.url.endsWith('api/site/offices'))
              )
    ;
  }
}
