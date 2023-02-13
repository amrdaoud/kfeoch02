import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, delay, finalize, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getLocaleDate } from '../app-helpers/date-helper';
import { AdminBilling, AdminOffice, Office } from '../app-models/office';
import { DynamicTableByndingModel, DynamicTableResult } from '../app-models/shared';
import { AsyncValidatorsService } from '../app-validators/async-validators.service';
import { validateGreaterFunction, validateLessFunction } from '../app-validators/custom-validators';
import { AccountService } from './account.service';
import LanguageService from './language.service';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {
  private officeUrl = environment.apiUrl + 'office/';
  private isLoading$ = new BehaviorSubject<boolean>(false);
  private isOfficesLoading$ = new BehaviorSubject<boolean>(false);
  private isBillingLoading$ = new BehaviorSubject<boolean>(false);
  private officeSize = new BehaviorSubject<number>(0);
  private billingSize = new BehaviorSubject<number>(0);
  isAdmin = this.accountService.inRoles(['Administrator', 'OfficeManager']);
  constructor(private asyncValidatorService: AsyncValidatorsService,
              private http: HttpClient,
              private snackBar: MatSnackBar,
              private languageService: LanguageService,
              private accountService: AccountService) { }
  createOfficeForm(model?: Office): FormGroup {
    const frm = new FormGroup({
      Id: new FormControl(model ? model.Id : 0),
      NameArabic: new FormControl(model ? model.NameArabic : '',{
        updateOn: 'blur',
        validators : [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
        asyncValidators: this.asyncValidatorService.validateOfficeNameArabic(model ? model.NameArabic : ''),
      }),
      NameEnglish: new FormControl(model ? model.NameEnglish : '',{
        updateOn: 'blur',
        validators : [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
        asyncValidators: this.asyncValidatorService.validateOfficeNameEnglish(model ? model.NameEnglish : '')
      }),
      TypeId: new FormControl({value: model ? model.TypeId : '', disabled: !this.isAdmin},
                                                                                          {
                                                                                            updateOn: 'blur',
                                                                                            validators : [Validators.required],
                                                                                            asyncValidators: this.asyncValidatorService.validateOfficeUserId('LicenseId', true, model?.TypeId.toString(), model?.LicenseId.toString())
                                                                                          }),
      LicenseId: new FormControl({value: model ? model.LicenseId : '', disabled: !this.isAdmin},{
                                                                                                  updateOn: 'blur',
                                                                                                  validators : [Validators.required],
                                                                                                  asyncValidators: this.asyncValidatorService.validateOfficeUserId('TypeId', false, model?.LicenseId.toString(), model?.TypeId.toString())
                                                                                                }),
      RegistrationDate: new FormControl({value: model ? getLocaleDate(model.RegistrationDate) : '', disabled: !this.isAdmin}),
      EstablishmentDate: new FormControl({value: model ? getLocaleDate(model.EstablishmentDate) : '', disabled: !this.isAdmin}, [validateLessFunction('LicenseEndDate')]),
      LicenseEndDate: new FormControl({value: getLocaleDate(model?.LicenseEndDate),disabled: !this.isAdmin}, [validateGreaterFunction('EstablishmentDate')]),
      Email: new FormControl({value:model ? model.Email : '', disabled: !this.isAdmin}, {
        updateOn: 'blur',
        validators: [Validators.required,
        Validators.pattern(/^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/)],
        asyncValidators: [this.asyncValidatorService.validateOfficeEmail(model?.Email)]
        }),
      PhoneNumber: new FormControl(model ? model.PhoneNumber : '',[Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      FaxNumber: new FormControl(model ? model.FaxNumber : '', [Validators.minLength(8), Validators.maxLength(8)]),
      MailBox: new FormControl(model ? model.MailBox : ''),
      CountryId: new FormControl({value: model?.CountryId, disabled: model?.IsLocal! || !this.isAdmin}),
      GovernorateId: new FormControl(model?.GovernorateId),
      AreaId: new FormControl(model?.AreaId),
      PostalCode: new FormControl(model ? model.PostalCode : ''),
      Address: new FormControl(model ? model.Address : '', Validators.required),
      EntityId: new FormControl({value: model ? model.EntityId : '', disabled: !this.isAdmin}),
      LegalEntityId: new FormControl({value: model ? model.LegalEntityId : '', disabled: !this.isAdmin}),
      // AgreeToTerms: new FormControl(model?.AgreeToTerms, [Validators.required]),
      IsVerified: new FormControl({value: model ? model.IsVerified : false, disabled: !this.isAdmin}),
      IsActive: new FormControl({value: model ? model.IsActive : false, disabled: !this.isAdmin}),
      // LogoUrl: new FormControl(model ? model.LogoUrl : ''),
      ShowInHome: new FormControl({value: model ? model.ShowInHome : false, disabled: !this.isAdmin}),
      AutoNumberOne: new FormControl(model?.AutoNumberOne, [Validators.minLength(8), Validators.maxLength(8)]),
      AutoNumberTwo: new FormControl(model?.AutoNumberTwo, [Validators.minLength(8), Validators.maxLength(8)]),
      EmailTwo: new FormControl(model?.EmailTwo, Validators.pattern(/^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/)),
      RenewYears: new FormControl({value: model?.RenewYears, disabled: !this.isAdmin }, Validators.required),
      MembershipEndDate: new FormControl({value: getLocaleDate(model?.MembershipEndDate), disabled: !this.isAdmin})
    });
    return frm;
  }
  createOfficeChangePasswordForm(): FormGroup {
    const frm = new FormGroup({});
    return frm;
  }
  getOfficeById(id: number): Observable<Office> {
    this.isLoading$.next(true)
    return this.http.get<Office>(this.officeUrl + id).pipe(
      finalize(() => this.isLoading$.next(false))
    )
  }
  updateOffice(id: number, model: Office): Observable<Office> {
    this.isLoading$.next(true);
    const url = this.isAdmin ? this.officeUrl+id : this.officeUrl+'update-info/' + id;
    return this.http.put<Office>(url, model).pipe(
      tap(() => this.snackBar.open(this.languageService.translate('Office Saved'), this.languageService.translate('Dismiss'), {duration: 2000})),
      finalize(() => {
        this.isLoading$.next(false)
      })
    );
  }
  uploadLogo(data: FormData): Observable<{LogoUrl: string}> {
    return this.http.post<{LogoUrl: string}>(this.officeUrl + 'upload-logo', data);
  }
  deleteLogo(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.officeUrl + 'delete-logo/' + id);
  }
  getOfficesByFilter(filter: DynamicTableByndingModel): Observable<any[]> {
    this.isOfficesLoading$.next(true);
    return this.http.post<DynamicTableResult>(this.officeUrl + 'filter', filter).pipe(
      tap(x => {
        if(this.officeSize.value !== x.DataSize) {
          this.officeSize.next(x.DataSize);
        }
      }),
      map(x => x.Data),
      finalize(() => this.isOfficesLoading$.next(false))
    );
  }
  exportOfficeByFilter(filter: DynamicTableByndingModel): Observable<any> {
    this.isOfficesLoading$.next(true);
    return this.http.post(this.officeUrl + 'filter-export', filter, {responseType: 'blob'}).pipe(
      tap(x => {
        console.log(x)
      }),
      finalize(() => this.isOfficesLoading$.next(false))
    );
  }
  getBillingByFilter(filter: DynamicTableByndingModel): Observable<AdminBilling[]> {
    this.isBillingLoading$.next(true);
    return this.http.post<DynamicTableResult>(this.officeUrl + 'payments/filter', filter).pipe(
      tap(x => this.billingSize.next(x.DataSize)),
      map(x => x.Data),
      finalize(() => this.isBillingLoading$.next(false))
    )
  }
  exportBillingByFilter(filter: DynamicTableByndingModel): Observable<any> {
    this.isBillingLoading$.next(true);
    return this.http.post(this.officeUrl + 'payments/filter-export', filter, {responseType: 'blob'}).pipe(
      tap(x => {
        console.log(x)
      }),
      finalize(() => this.isBillingLoading$.next(false))
    );
  }



  get isLoading(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }
  get isOfficeLoading(): Observable<boolean> {
    return this.isOfficesLoading$.asObservable();
  }
  get isBillingLoading(): Observable<boolean> {
    return this.isBillingLoading$.asObservable();
  }
  get officeSize$(): Observable<number> {
    return this.officeSize.asObservable();
  }
  get billingSize$(): Observable<number> {
    return this.billingSize.asObservable();
  }

}
