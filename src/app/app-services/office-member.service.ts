import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MemberFile, OfficeMember, OfficeMemberViewModel } from '../app-models/office-members';

@Injectable({
  providedIn: 'root'
})
export class OfficeMemberService {
  private url = environment.apiUrl + 'office/owners/';
  private memberUrl = environment.apiUrl + 'officeowner/'
  private isLoading$ = new BehaviorSubject<boolean>(false);
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
    return this.http.post<MemberFile>(this.memberUrl + 'document', data);
  }
  getFile(id: number): Observable<any> {
    return this.http.get(this.memberUrl + 'document/view/' + id,{responseType: 'blob'});
  }
  deleteFile(id: number): Observable<boolean> {
    //this.isLoading$.next(true);
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
      NameArabic: new FormControl(model?.NameArabic, Validators.required),
      NameEnglish: new FormControl(model?.NameEnglish, Validators.required),
      GenderId: new FormControl(model?.GenderId, Validators.required),
      NationalId: new FormControl(model?.NationalId),
      SemId: new FormControl(model?.SemId),
      SpecialityId: new FormControl(model?.SpecialityId),
      ExperienceYears: new FormControl(model?.ExperienceYears)
    });
    return frm;
  }
  get isLoading(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }
}
