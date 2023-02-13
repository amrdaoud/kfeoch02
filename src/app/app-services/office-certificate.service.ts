import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OfficeCertificate, OfficeCertificateBinding } from '../app-models/office-certificates';
import LanguageService from './language.service';

@Injectable({
  providedIn: 'root'
})
export class OfficeCertificateService {
  private url = environment.apiUrl + 'OfficeRequest/';
  private isGettingCrtificate = new BehaviorSubject<boolean>(false);
  private isLoading = new BehaviorSubject<boolean>(false);
  private isLoadingPayments = new BehaviorSubject<boolean>(false);
  private currentLanguage = this.languageService.currentLanguage;
  constructor(private http: HttpClient,
              private languageService: LanguageService) { }
  createMembershipForm(officeId: number): FormGroup {
    const frm = new FormGroup({
      OfficeId: new FormControl(officeId, Validators.required),
      CertificateEntityId: new FormControl('', Validators.required),
      RequestTypeId: new FormControl({value: 1, disabled: true}, Validators.required),
      Lang: new FormControl(this.currentLanguage),
      ReturnUrl: new FormControl('')
    });
    return frm;
  }
  createInformationForm(officeId: number): FormGroup {
    const frm = new FormGroup({
      OfficeId: new FormControl(officeId, Validators.required),
      RequestTypeId: new FormControl({value: 2, disabled: true}, Validators.required),
      Lang: new FormControl(this.currentLanguage),
      ReturnUrl: new FormControl('')
    });
    return frm;
  }
  getAllOfficeCertificates(id: number): Observable<OfficeCertificate[]> {
    this.isLoading.next(true);
    return this.http.get<OfficeCertificate[]>(this.url + 'GetAllOfficeRequests/' + id).pipe(
      finalize(() => {
        this.isLoading.next(false);
      })
    )
  }
  getCertificateById(id: number): Observable<{Html: string, HasQr: boolean}> {
    this.isGettingCrtificate.next(true);
    return this.http.get<{Html: string, HasQr: boolean}>(this.url + 'getrequestcertificate/' + id).pipe(
      finalize(() => this.isGettingCrtificate.next(false))
    )
  }
  postRequestKpay(model: OfficeCertificateBinding): Observable<{PaymentUrl:string}> {
    this.isLoadingPayments.next(true);
    const returnUrl = window.location.origin + '/office/certificates/list';
    model.ReturnUrl = returnUrl.replace(/:/g,'_').replace(/\//g,',');
    return this.http.post<{PaymentUrl:string}>(this.url, model).pipe(
      finalize(() => this.isLoadingPayments.next(false))
    )
  }

  get isLoading$(): Observable<boolean> {
    return this.isLoading.asObservable();
  }
  get isGettingCertificate$(): Observable<boolean> {
    return this.isGettingCrtificate.asObservable();
  }
  get isLoadingPayments$(): Observable<boolean> {
    return this.isLoadingPayments.asObservable();
  }
}
