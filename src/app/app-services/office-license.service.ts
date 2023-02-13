import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, concatMap, filter, finalize, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getLocaleDate } from '../app-helpers/date-helper';
import { Specialty } from '../app-models/dictionary';
import { AdminLicense, License, PaymentDetailsModel, PaymentModel } from '../app-models/office-licenses';
import { validateGreaterFunction, validateLessFunction } from '../app-validators/custom-validators';

@Injectable({
  providedIn: 'root'
})
export class OfficeLicenseService {
  private isLoading = new BehaviorSubject<boolean>(false);
  private isGettingReceipt = new BehaviorSubject<boolean>(false);;
  private isLoadingPayments = new BehaviorSubject<boolean>(false);
  private url = environment.apiUrl + 'OfficeLicenses/';
  downloadingFile$ = new Map<number,BehaviorSubject<number>>();
  constructor(private http: HttpClient) { }
  createOfficeLicenseForm(officeId: number, model: License | null, eligibleSpecialities?: Specialty[]): FormGroup {
    const frm = new FormGroup({
      Id: new FormControl(model ? model.Id : 0),
      OfficeId: new FormControl(model ? model.OfficeId : officeId, Validators.required),
      OfficeEntityId: new FormControl(model?.OfficeEntityId, Validators.required),
      Specialities: new FormControl(
        model && eligibleSpecialities ? eligibleSpecialities.filter(x => model.Specialities.map(s => s.Id).includes(x.Id))
        :
        model?.Specialities,
      Validators.required),
      StartDate: new FormControl(model ? getLocaleDate(model.StartDate) : '',[Validators.required,validateLessFunction('EndDate')]),
      EndDate: new FormControl(model ? getLocaleDate(model.EndDate) : '', [Validators.required,validateGreaterFunction('StartDate')]),
      Note: new FormControl(model?.Note, {updateOn: 'blur'}),
      file: new FormControl('')
    });
    return frm;
  }
  getOfficeLicenses(officeId: number): Observable<License[]> {
    this.isLoading.next(true);
    return this.http.get<License[]>(this.url + 'office/' +  officeId).pipe(
      finalize(() => this.isLoading.next(false))
    )
  }
  getLicenseById(id: number): Observable<License> {
    this.isLoading.next(true);
    return this.http.get<License>(this.url + 'GetLicenseById/' +  id).pipe(
      finalize(() => this.isLoading.next(false))
    )
  }
  // getAllPaymentsByOfficeId(id: number): Observable<PaymentDetailsModel[]> {
  //   this.isLoading.next(true);
  //   return this.http.get<PaymentDetailsModel[]>(this.url + 'getallofficepayments/'+ id).pipe(
  //     finalize(() => this.isLoading.next(false))
  //   );
  // }
  addLicense(model: License): Observable<License> {
    this.isLoading.next(true);
    return this.http.post<License>(this.url, model).pipe(
      concatMap(x => {
        if(x && model.file) {
          return this.uploadDocument(x,model.file)
        }
        else {
          return of(x)
        }
      }),
      finalize(() => this.isLoading.next(false))
    )
  }
  uploadDocument(model: License, file: File): Observable<License> {
    const formData = new FormData();
    formData.append("File", file);
    formData.append("FileName", model.Id ? model.Id.toString() : '');
    return this.http.post<{LogoUrl: string}>(this.url + 'upload-document', formData).pipe(
      map(x => {
        model.DocumentUrl = x.LogoUrl;
        return model;
      })
    );
  }
  getFile(id: number): Observable<any> {
    const req = new HttpRequest('GET', this.url + 'document/view/' + id, {reportProgress: true, responseType: 'blob'});
    return this.http.request(req).pipe(
      tap((evt: HttpEvent<unknown>) => {this.handleDownloadProgress(evt, id)}),
      filter((evt: HttpEvent<unknown>) => evt.type === HttpEventType.Response),
      map((resp: HttpEvent<any>) => (resp as HttpResponse<any>).body)
    )
  }
  getPendingLicenses(): Observable<AdminLicense[]> {
    this.isLoading.next(true);
    return this.http.get<AdminLicense[]>(this.url + 'GetPendingLicenses').pipe(
      finalize(() => this.isLoading.next(false))
    )
  }
  getPaymentsByOfficeId(id: number): Observable<PaymentModel> {
    this.isLoadingPayments.next(true);
    return this.http.get<PaymentModel>(this.url + 'getpayments/' + id).pipe(
      finalize(() => this.isLoadingPayments.next(false))
    )
  }
  rejectLicense(id: number): Observable<boolean> {
    this.isLoading.next(true);
    return this.http.get<boolean>(this.url + 'rejectlicense/' + id).pipe(
      finalize(() => this.isLoading.next(false))
    )
  }
  approveLicense(id: number, model: License): Observable<License> {
    this.isLoading.next(true);
    return this.http.put<License>(this.url + 'ApproveLicense/' + id, model).pipe(
      finalize(() => this.isLoading.next(false))
    )
  }
  editLicense(id: number, model: License): Observable<License> {
    this.isLoading.next(true);
    return this.http.put<License>(this.url + 'PutLicense/' + id, model).pipe(
      finalize(() => this.isLoading.next(false))
    )
  }
  getPaymentByLicense(model: License): Observable<PaymentModel> {
    this.isLoadingPayments.next(true);
    return this.http.post<PaymentModel>(this.url + 'GetPaymentsbylicense', model).pipe(
      finalize(() => this.isLoadingPayments.next(false))
    )
  }
  getRenewPaymentsByOfficeId(id: number): Observable<PaymentDetailsModel[]> {
    this.isLoading.next(true);
    return this.http.get<PaymentDetailsModel[]>(this.url + 'GetAllOfficeRenewPayments/' + id ).pipe(
      finalize(() => this.isLoading.next(false))
    )
  }
  getRenewInfoByOffice(officeId: number): Observable<PaymentModel> {
    this.isLoadingPayments.next(true);
    return this.http.get<PaymentModel>(this.url + 'getrenewpayments/' + officeId).pipe(
      finalize(() => this.isLoadingPayments.next(false))
    )
  }
  renewOffice(officeId: number): Observable<PaymentModel> {
    this.isLoadingPayments.next(true);
    return this.http.post<PaymentModel>(this.url + 'postrenewpayments/' + officeId, null).pipe(
      finalize(() => this.isLoadingPayments.next(false))
    )
  }
  renewOfficeKpay(officeId: number, lang: string, returnUrl?: string): Observable<{PaymentUrl:string}> {
    this.isLoadingPayments.next(true);
    returnUrl = window.location.origin + '/office/licenses/payments';
    returnUrl = returnUrl.replace(/:/g,'_').replace(/\//g,',');
    return this.http.post<{PaymentUrl:string}>(this.url + 'postrenewpayments', {id: officeId, lang: lang, returnUrl: returnUrl}).pipe(
      finalize(() => this.isLoadingPayments.next(false))
    )
  }
  getReceiptByPaymentId(id: number): Observable<{Html: string}> {
    this.isGettingReceipt.next(true);
    return this.http.get<{Html: string}>(this.url + 'getpaymentreceipt/' + id).pipe(
      finalize(() => this.isGettingReceipt.next(false))
    )
  }


  private handleDownloadProgress(event: HttpEvent<unknown>, id: number){
    switch(event.type) {
        case HttpEventType.Sent :
          this.downloadingFile$.set(id,new BehaviorSubject<number>(0));
          break;
        case HttpEventType.ResponseHeader:
          //this.downloadingFile$.delete(id);
          break;
        case HttpEventType.DownloadProgress:
          this.downloadingFile$.get(id)?.next(100 * (event.loaded / (event.total ?? 0)));
          break;
        case HttpEventType.Response:
          this.downloadingFile$.delete(id);
          break;
        default :
          this.downloadingFile$.delete(id);
          break;
    }
  }
  get isLoading$(): Observable<boolean> {
    return this.isLoading.asObservable();
  }
  get isLoadingPayments$(): Observable<boolean> {
    return this.isLoadingPayments.asObservable();
  }
  get isGettingReceipt$(): Observable<boolean> {
    return this.isGettingReceipt.asObservable();
  }
}
