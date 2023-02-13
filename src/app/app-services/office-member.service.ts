import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, filter, finalize, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MemberFile, OfficeMember, OfficeMemberViewModel } from '../app-models/office-members';

@Injectable({
  providedIn: 'root'
})
export class OfficeMemberService {
  private url = environment.apiUrl + 'office/owners/';
  private memberUrl = environment.apiUrl + 'officeowner/'
  private isLoading$ = new BehaviorSubject<boolean>(false);
  uploadingType$ = new Map<number,BehaviorSubject<number>>();
  downloadingFile$ = new Map<number,BehaviorSubject<number>>();
  downloadingForm$ = new Map<number,BehaviorSubject<number>>();
  constructor(private http: HttpClient) { }
  getMembersByOfficeId(id: number): Observable<OfficeMemberViewModel[]> {
    this.isLoading$.next(true);
    return this.http.get<OfficeMemberViewModel[]>(this.url + id).pipe(
      finalize(() => this.isLoading$.next(false))
    );
  }
  getMemberById(id: number): Observable<OfficeMember> {
    this.isLoading$.next(true);
    return this.http.get<OfficeMember>(this.memberUrl + id).pipe(
      finalize(() => this.isLoading$.next(false))
    );
  }
  addOfficeMember(model: OfficeMember): Observable<OfficeMember> {
    this.isLoading$.next(true);
    return this.http.post<OfficeMember>(this.memberUrl, model).pipe(
      finalize(() => this.isLoading$.next(false))
    );
  }
  editOfficeMember(id: number, model: OfficeMember): Observable<OfficeMember> {
    this.isLoading$.next(true);
    return this.http.put<OfficeMember>(this.memberUrl + id, model).pipe(
      finalize(() => this.isLoading$.next(false))
    );
  }
  uploadFile(data: FormData): Observable<MemberFile> {
    const req = new HttpRequest('POST', this.memberUrl + 'document', data, {reportProgress: true});
    return this.http.request<MemberFile>(req).pipe(
      tap((evt: HttpEvent<unknown>) => {this.handleUploadProgress(evt, +data.get('TypeId')!)}),
      filter((evt: HttpEvent<unknown>) => evt.type === HttpEventType.Response),
      map((resp: HttpEvent<any>) => (resp as HttpResponse<any>).body)
    )
    // return this.http.post<MemberFile>(this.memberUrl + 'document', data);
  }
  getFile(id: number): Observable<any> {
    const req = new HttpRequest('GET', this.memberUrl + 'document/view/' + id, {reportProgress: true, responseType: 'blob'});
    return this.http.request(req).pipe(
      tap((evt: HttpEvent<unknown>) => {this.handleDownloadProgress(evt, id)}),
      filter((evt: HttpEvent<unknown>) => evt.type === HttpEventType.Response),
      map((resp: HttpEvent<any>) => {
        console.log((resp as HttpResponse<any>).body);
        return (resp as HttpResponse<any>).body
      }),
      catchError(err => {
        console.log(err);
        throw err;
      })
    )
    //return this.http.get(this.memberUrl + 'document/view/' + id,{responseType: 'blob'});
  }
  downloadDocumentTypeForm(id: number): Observable<any> {
    const req = new HttpRequest('GET', this.memberUrl + 'document-type/view/' + id, {reportProgress: true, responseType: 'blob'});
    return this.http.request(req).pipe(
      tap((evt: HttpEvent<unknown>) => {this.handleFormDownloadProgress(evt, id)}),
      filter((evt: HttpEvent<unknown>) => evt.type === HttpEventType.Response),
      map((resp: HttpEvent<any>) => (resp as HttpResponse<any>).body)
    )
  }
  deleteFile(id: number): Observable<boolean> {
    this.isLoading$.next(true);
    return this.http.delete<boolean>(this.memberUrl + 'document/' + id).pipe(
      finalize(() => {
        this.isLoading$.next(false);
      })
    )
  }
  createOfficeMemberForm(officeId: number | null, model?: OfficeMember): FormGroup {
    const frm = new FormGroup({
      Id: new FormControl(model?.Id ?? 0),
      OfficeId: new FormControl(model?.OfficeId ?? officeId, Validators.required),
      NameArabic: new FormControl(model?.NameArabic, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      NameEnglish: new FormControl(model?.NameEnglish, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      GenderId: new FormControl(model?.GenderId, Validators.required),
      NationalId: new FormControl(model?.NationalId, [Validators.minLength(12), Validators.maxLength(12)]),
      SemId: new FormControl(model?.SemId,Validators.required),
      SpecialityId: new FormControl(model?.SpecialityId, Validators.required),
      PositionId: new FormControl(model?.PositionId),
      ExperienceYears: new FormControl(model?.ExperienceYears, Validators.required),
      PhoneNumber: new FormControl(model?.PhoneNumber, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      PhoneNumberTwo: new FormControl(model?.PhoneNumberTwo, [Validators.minLength(8), Validators.maxLength(8)]),
      Email: new FormControl(model?.Email, [Validators.required,Validators.pattern(/^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/)]),
      NationalityId: new FormControl(model ? model.NationalityId : 92)
    });
    return frm;
  }
  get isLoading(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  private handleUploadProgress(event: HttpEvent<unknown>, id: number){
    switch(event.type) {
        case HttpEventType.Sent :
          this.uploadingType$.set(id,new BehaviorSubject<number>(0));
          break;
        case HttpEventType.ResponseHeader:
          this.uploadingType$.delete(id);
          break;
        case HttpEventType.UploadProgress:
          this.uploadingType$.get(id)?.next(100 * (event.loaded / (event.total ?? 0)))
          break;
        case HttpEventType.Response:
          this.uploadingType$.delete(id);
          break;
        default :
          this.uploadingType$.delete(id);
          break;
    }
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
  private handleFormDownloadProgress(event: HttpEvent<unknown>, id: number){
    switch(event.type) {
        case HttpEventType.Sent :
          this.downloadingForm$.set(id,new BehaviorSubject<number>(0));
          break;
        case HttpEventType.ResponseHeader:
          //this.downloadingFile$.delete(id);
          break;
        case HttpEventType.DownloadProgress:
          this.downloadingForm$.get(id)?.next(100 * (event.loaded / (event.total ?? 0)));
          break;
        case HttpEventType.Response:
          this.downloadingForm$.delete(id);
          break;
        default :
          this.downloadingForm$.delete(id);
          break;
    }
  }
}
