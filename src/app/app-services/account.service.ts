import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, delay, filter, finalize, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminLoginModel, AuthenticationModel, ForgetReceiveModel, ForgetSendModel, OfficeChangePasswordModel, OfficeLoginModel, OfficeRegistrationModel } from '../app-models/account';
import { mainRouteConfig, routeConfig } from '../app-models/routes-urls';
import { ResultWithMessage } from '../app-models/shared';
import { AsyncValidatorsService } from '../app-validators/async-validators.service';
import { validateClearSibling, validateMatchFunction, validatePassword } from '../app-validators/custom-validators';
import { DictionaryService } from './dictionary.service';
import LanguageService from './language.service';



@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accountUrl = environment.apiUrl + 'account/';
  private isRegistering$ = new BehaviorSubject<boolean>(false);
  private isLogging$ = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient,
              private asyncValidatorService: AsyncValidatorsService,
              private languageService: LanguageService,
              private router: Router,
              private snackBar: MatSnackBar
              ) { }
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
        Validators.pattern(/^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/)],
        asyncValidators: [this.asyncValidatorService.validateOfficeEmail('')]
        }),
      PhoneNumber: new FormControl('',[Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      Password: new FormControl('', [Validators.required,
        Validators.minLength(3),
        validateClearSibling('PasswordConfirm')]),
      PasswordConfirm: new FormControl('', [Validators.required, validateMatchFunction('Password')]),
      AggreeToTerms: new FormControl(false, [Validators.required])
    });
    return frm;
  }
  createUserRegisterForm(): FormGroup {
    const frm = new FormGroup({
      UserName: new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        Validators.pattern(/^[A-Za-z][A-Za-z0-9_]{4,30}$/)],
        asyncValidators: [
          //this.asyncValidatorService.validateUserName('')
        ]
      }),
      Email: new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.required,
        Validators.pattern(/^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/)],
        asyncValidators: [this.asyncValidatorService.validateOfficeEmail('')]
        }),
      Password: new FormControl('', [Validators.required,
        Validators.minLength(3),
        validateClearSibling('PasswordConfirm')]),
      PasswordConfirm: new FormControl('', [Validators.required, validateMatchFunction('Password')]),
      Roles: new FormControl([], Validators.required)
    });
    return frm;
  }
  createOfficeChangePasswordForm(): FormGroup {
    const frm = new FormGroup({
      UserName: new FormControl(this.getUserName(), Validators.required),
      CurrentPassword: new FormControl('',Validators.required),
      NewPassword: new FormControl('', [Validators.required,
        Validators.minLength(3),
        validateClearSibling('PasswordConfirm')]),
      PasswordConfirm: new FormControl('', [Validators.required, validateMatchFunction('NewPassword')])
    });
    return frm;
  }
  createEmailForm(): FormGroup {
    const frm = new FormGroup({
      Email: new FormControl('', {
        validators: [Validators.required,
        Validators.pattern(/^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/)]
        }),
    });
    return frm;
  }
  createForgetSenderForm(): FormGroup {
    const hostUrl = window.location.origin + '/account/reset-password';
    const frm = new FormGroup({
      Email: new FormControl('', {
        validators: [Validators.required,
        Validators.pattern(/^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/)]
        }),
      ClientUri: new FormControl(hostUrl,Validators.required)
    });
    return frm;
  }
  createForgetReceiverForm(token: string, Email: string): FormGroup {
    const frm = new FormGroup({
      Email: new FormControl(Email, {
        validators: [Validators.required,
        Validators.pattern(/^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/)]
        }),
      Token: new FormControl(token,Validators.required),
      Password: new FormControl('', [Validators.required,
        Validators.minLength(3),
        validateClearSibling('PasswordConfirm')]),
      PasswordConfirm: new FormControl('', [Validators.required, validateMatchFunction('Password')])
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
  httpOfficeLogin(model: OfficeLoginModel, returnUrl?: string): Observable<AuthenticationModel> {
    this.isLogging$.next(true)
    return this.http.post<AuthenticationModel>(this.accountUrl + 'office-login', model).pipe(
      tap(x => {
        if(x.IsAuthenticated && !x.IsEmailConfirmed) {
          this.router.navigateByUrl('/account/resend-email')
        } else if(!x.IsAuthenticated) {
          this.snackBar.open(this.languageService.translate('Please Check Type, License or Password!'),this.languageService.translate('Dismiss'),{duration: 2000})
        }
      }),
      filter(x => x.IsAuthenticated && x.IsEmailConfirmed),
      tap(x => this.storeAuth(x)),
      tap(() => returnUrl ? this.router.navigateByUrl(returnUrl) : this.router.navigateByUrl('/office/home/information')),
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
  httpResendEmailConfirmation(email: string): Observable<any> {
    this.isLogging$.next(true);
    return this.http.get<any>(this.accountUrl + 'resend-confirm-email?email=' + email).pipe(
      finalize(() => this.isLogging$.next(false))
    )
  }
  httpForgetSend(model: ForgetSendModel): Observable<boolean> {
    this.isLogging$.next(true);
    return this.http.post<boolean>(this.accountUrl + 'forget-password', model).pipe(
      finalize(() => this.isLogging$.next(false))
    )
  }
  httpForgetReceive(model: ForgetReceiveModel): Observable<boolean> {
    this.isLogging$.next(true);
    return this.http.post<boolean>(this.accountUrl + 'reset-password', model).pipe(
      finalize(() => this.isLogging$.next(false))
    )
  }

  getMainRouteConfig(mc: mainRouteConfig[]): mainRouteConfig[] {
    if(this.inRoles(['SuperUser'])) {
      return mc;
    }
    return mc.filter(x => this.inRoles(x.roles))
  }
  getRouteConfig(rc: routeConfig[]): routeConfig[] {
    if(this.inRoles(['SuperUser'])) {
      return rc;
    }
    return rc.filter(x => this.inRoles(x.roles))
  }
  getFirstRoute(rc: routeConfig[]): string | undefined {
    if(this.inRoles(['SuperUser'])) {
      return rc[0].routerLink;
    }
    return rc.find(x => this.inRoles(x.roles))?.routerLink;
  }
  ///Local Storage (Auth)

  private storeAuth(model: AuthenticationModel) {
    model.TokenDate = Date.now();
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
  getAuthNameAsync(): Observable<string | null> {
    const auth = this.auth;
    if(!auth) {
      return of(null);
    }
    return this.languageService.currentLanguage$.pipe(
      map(x => {
        if(x === 'ar') {
          return auth.NameArabic;
        }
        return auth.NameEnglish;
      })
    )
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
  inRoles(roles: string[]): boolean {
    const auth = this.auth;
    if(auth) {
      return auth.Roles?.includes('SuperUser') || auth.Roles?.find(x => roles.includes(x)) ? true : false;
    }
    return false;
  }
  isTokenExpired(): boolean {
    //return true;
    return !this.auth || Date.now() - this.auth.TokenDate > this.auth.TokenDurationM * 60 * 1000;
  }
  refreshToken(): Observable<AuthenticationModel | null> {
    return this.http.post<AuthenticationModel>(this.accountUrl + 'refresh-token',{
      Token: this.auth?.RefreshToken ?? ''
    })
    .pipe(
      tap(x => {
        this.storeAuth(x)
      })
    )
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

