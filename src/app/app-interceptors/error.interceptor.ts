import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { ErrorService } from '../app-services/error.service';
import LanguageService from '../app-services/language.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private errorService: ErrorService,
              private languageService: LanguageService,
              private router: Router) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
          if(error.status === 0) {
            this.errorService.open(error.status, 'Please check your connection!');
          }
          else if(error.status === 401 || error.status === 403) {
            //this.errorService.open(error.status, 'Your are not authorized to perform this action!');
            this.router.navigateByUrl('/redirects/403');
          }
          else if(error.status === 500) {
            this.errorService.open(error.status, 'Something went wrong please report the error to developers!');
          }
          else if(error && error.error && error.error.message) {
            const m = this.languageService.currentLanguage === 'ar' && error.error.messageArabic ? error.error.messageArabic : error.error.message;
            this.errorService.open(error.status, m);
          } else if(error && error.message) {
            this.errorService.open(error.status, error.message);
          } else {
            this.errorService.open(error.status, JSON.stringify(error));
          }
        throw error;

      })
    )
  }
}
