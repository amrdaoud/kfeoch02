import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, delay, finalize, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminLoginModel, AuthenticationModel, OfficeChangePasswordModel, OfficeLoginModel, OfficeRegistrationModel } from '../app-models/account';
import { ResultWithMessage } from '../app-models/shared';
import { AsyncValidatorsService } from '../app-validators/async-validators.service';
import { validateClearSibling, validateMatchFunction } from '../app-validators/custom-validators';
import { DictionaryService } from './dictionary.service';
import LanguageService from './language.service';



@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accountUrl = environment.apiUrl + 'account/';
  officeTypes = this.dictionaryService.officeTypes;
  officeTypesLoading = this.dictionaryService.officeTypesLoading;
  private isRegistering$ = new BehaviorSubject<boolean>(false);
  private isLogging$ = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient,
              private dictionaryService: DictionaryService,
              private asyncValidatorService: AsyncValidatorsService,
              private languageService: LanguageService) { }
  createOfficeLoginForm(): FormGroup {
    const frm = new FormGroup({
      OfficeTypeId: new FormControl('', Validators.required),
      LicenseId: new FormControl('',Validators.required),
      Password: new FormControl('', Validators.required)
    });
    return frm;
  }
  createAdminLoginForm(): FormGroup {
    const frm = new FormGroup({
      UserName: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required)
    });
    return frm;
  }
  createOfficeRegisterForm(): FormGroup {
    const frm = new FormGroup({
      OfficeTypeId: new FormControl('', {
        updateOn: 'blur',
        validators : [Validators.required],
        asyncValidators: this.asyncValidatorService.validateOfficeUserId('LicenseId', true)
      }),
      LicenseId: new FormControl('',{
        updateOn: 'blur',
        validators : [Validators.required],
        asyncValidators: this.asyncValidatorService.validateOfficeUserId('OfficeTypeId', false)
      }),
      NameArabic: new FormControl('',{
        updateOn: 'blur',
        validators : [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
        asyncValidators: this.asyncValidatorService.validateOfficeNameArabic('')
      }),
      NameEnglish: new FormControl('',{
        updateOn: 'blur',
        validators : [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
        asyncValidators: this.asyncValidatorService.validateOfficeNameEnglish('')
      }),
      Email: new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.required,
        Validators.pattern(/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/)],
        asyncValidators: [this.asyncValidatorService.validateOfficeEmail('')]
        }),
      PhoneNumber: new FormControl('',Validators.required),
      Password: new FormControl('', [Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/),
        validateClearSibling('PasswordConfirm')]),
      PasswordConfirm: new FormControl('', [Validators.required, validateMatchFunction('Password')])
    });
    return frm;
  }
  createOfficeChangePasswordForm(): FormGroup {
    const frm = new FormGroup({
      UserName: new FormControl(this.getUserName(), Validators.required),
      CurrentPassword: new FormControl('',Validators.required),
      NewPassword: new FormControl('', [Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/),
        validateClearSibling('PasswordConfirm')]),
      PasswordConfirm: new FormControl('', [Validators.required, validateMatchFunction('NewPassword')])
    });
    return frm;
  }
  ///Http Requests

  httpOfficeRegister(model: OfficeRegistrationModel): Observable<ResultWithMessage> {
    this.isRegistering$.next(true)
    return this.http.post<ResultWithMessage>(this.accountUrl + 'office-register', model).pipe(
      finalize(() => this.isRegistering$.next(false))
    )
  }
  httpOfficeLogin(model: OfficeLoginModel): Observable<AuthenticationModel> {
    this.isLogging$.next(true)
    return this.http.post<AuthenticationModel>(this.accountUrl + 'office-login', model).pipe(
      tap(x => this.storeAuth(x)),
      finalize(() => this.isLogging$.next(false))
    )
  }
  httpAdminLogin(model: AdminLoginModel): Observable<AuthenticationModel> {
    this.isLogging$.next(true)
    return this.http.post<AuthenticationModel>(this.accountUrl + 'admin-login', model).pipe(
      tap(x => this.storeAuth(x)),
      finalize(() => this.isLogging$.next(false))
    )
  }
  httpOfficeChangePassword(model: OfficeChangePasswordModel): Observable<ResultWithMessage> {
    this.isLogging$.next(true)
    return this.http.post<ResultWithMessage>(this.accountUrl + 'office-changepassword', model).pipe(
      finalize(() => this.isLogging$.next(false))
    )
  }
  ///Local Storage (Auth)

  private storeAuth(model: AuthenticationModel) {
    localStorage.setItem('auth', JSON.stringify(model))
  }
  get auth(): AuthenticationModel | null {
    const authString = localStorage.getItem('auth');
    if(!authString) {
      return null;
    }
    const auth = JSON.parse(authString) as AuthenticationModel;
    if(!auth.IsAuthenticated) {
      return null;
    } else {
      return auth;
    }
  }

  getAuthName(): string | null {
    const auth = this.auth;
    if(auth) {
      return this.languageService.currentLanguage === 'ar' ? auth.NameArabic : auth.NameEnglish;
    }
    return null;
  }
  getOfficeId(): number | null {
    const auth = this.auth;
    if(auth) {
      return auth.OfficeId;
    }
    return null;
  }
  getUserName(): string | null {
    const auth = this.auth;
    if(auth) {
      return auth.UserName;
    }
    return null;
  }
  logOut() {
    localStorage.removeItem('auth');
  }

  ///Async Validators

  ///Elements
  get isRegistering(): Observable<boolean> {
    return this.isRegistering$.asObservable();
  }
  get isLogging(): Observable<boolean> {
    return this.isLogging$.asObservable();
  }
}

