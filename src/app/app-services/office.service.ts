import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, delay, finalize, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getLocaleDate } from '../app-helpers/date-helper';
import { Office } from '../app-models/office';
import { AsyncValidatorsService } from '../app-validators/async-validators.service';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {
  private officeUrl = environment.apiUrl + 'office/';
  private isLoading$ = new BehaviorSubject<boolean>(false);
  constructor(private asyncValidatorService: AsyncValidatorsService,
              private http: HttpClient,
              private snackBar: MatSnackBar) { }
  createOfficeForm(model?: Office): FormGroup {
    const frm = new FormGroup({
      Id: new FormControl({value: model?.Id, disabled:true}),
      NameArabic: new FormControl(model ? model.NameArabic : '',{
        updateOn: 'blur',
        validators : [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
        asyncValidators: this.asyncValidatorService.validateOfficeNameArabic(model ? model.NameArabic : '')
      }),
      NameEnglish: new FormControl(model ? model.NameEnglish : '',{
        updateOn: 'blur',
        validators : [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
        asyncValidators: this.asyncValidatorService.validateOfficeNameEnglish(model ? model.NameEnglish : '')
      }),
      TypeId: new FormControl({value: model ? model.TypeId : '', disabled: true}),
      LicenseId: new FormControl({value: model ? model.LicenseId : '', disabled: true}),
      RegistrationDate: new FormControl({value: model ? getLocaleDate(model.RegistrationDate) : '', disabled: true}),
      EstablishmentDate: new FormControl(model ? getLocaleDate(model.EstablishmentDate) : ''),
      LicenseEndDate: new FormControl(getLocaleDate(model?.LicenseEndDate)),
      Email: new FormControl(model ? model.Email : '', {
        updateOn: 'blur',
        validators: [Validators.required,
        Validators.pattern(/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/)],
        asyncValidators: [this.asyncValidatorService.validateOfficeEmail(model?.Email)]
        }),
      PhoneNumber: new FormControl(model ? model.PhoneNumber : '',Validators.required),
      FaxNumber: new FormControl(model ? model.FaxNumber : ''),
      MailBox: new FormControl(model ? model.MailBox : ''),
      CountryId: new FormControl(model ? model.CountryId : ''),
      GovernorateId: new FormControl(model?.GovernorateId),
      AreaId: new FormControl(model?.AreaId),
      PostalCode: new FormControl(model ? model.PostalCode : ''),
      Address: new FormControl(model ? model.Address : ''),
      EntityId: new FormControl(model ? model.EntityId : ''),
      LegalEntityId: new FormControl(model ? model.LegalEntityId : ''),
      AgreeToTerms: new FormControl(model ? model.AgreeToTerms : false),
      IsVerified: new FormControl({value: model ? model.IsVerified : false, disabled: true}),
      IsActive: new FormControl({value: model ? model.IsActive : false, disabled: true}),
      LogoUrl: new FormControl(model ? model.LogoUrl : ''),
      ShowInHome: new FormControl(model ? model.ShowInHome : false)
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
    return this.http.put<Office>(this.officeUrl+id, model).pipe(
      tap(() => this.snackBar.open('Office Saved', 'Dismiss', {duration: 2000})),
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



  get isLoading(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

}
