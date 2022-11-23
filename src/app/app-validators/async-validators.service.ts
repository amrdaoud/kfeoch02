import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { of, map, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsyncValidatorsService {
  private accountUrl = environment.apiUrl + 'account/';
  constructor(private http: HttpClient) { }

  validateOfficeUserId(checkControlName: string, isType: boolean, current?: string): AsyncValidatorFn {
    return (control: AbstractControl) => {
      const checkControl = control.parent?.get(checkControlName);
      if(!checkControl || checkControl.value === '') {
        return of(null);
      }
      if(current?.toString()?.toLowerCase() === control.value.toString().toLowerCase()) {
        return of(null);
      }
      if(isType) {
        checkControl.setValue('');
        return of(null);
      }
      const officeTypeId = isType ? control.value : checkControl?.value;
      const licenseId = isType ? checkControl?.value : control.value;
      return this.http.get<boolean>(this.accountUrl + `check-userid?officeTypeId=${officeTypeId}&licenseId=${licenseId}`).pipe(
        map(res => res ? {isTaken: true} : null),
        catchError(() => of({connection: true}))
      );
    }
  }

  validateOfficeNameEnglish(current?: string): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if(current?.toString()?.toLowerCase() === control.value.toString().toLowerCase()) {
        return of(null);
      }
      return this.http.get<boolean>(this.accountUrl + 'check-nameenglish?value=' + control.value).pipe(
        map(res => res ? {isTaken: true} : null),
        catchError(() => of({connection: true}))
      );
    }
  }
  validateOfficeNameArabic(current?: string): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if(current?.toString()?.toLowerCase() === control.value.toString().toLowerCase()) {
        return of(null);
      }
      return this.http.get<boolean>(this.accountUrl + 'check-namearabic?value=' + control.value).pipe(
        map(res => res ? {isTaken: true} : null),
        catchError(() => of({connection: true}))
      );
    }
  }

  validateOfficeEmail(current?: string): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if(current?.toString()?.toLowerCase() === control.value.toString().toLowerCase()) {
        return of(null);
      }
      return this.http.get<boolean>(this.accountUrl + 'check-email?value=' + control.value).pipe(
        map(res => res ? {isTaken: true} : null),
        catchError(() => of({connection: true}))
      );
    }
  }
}
