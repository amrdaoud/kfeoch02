import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, delay, finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Specialty } from '../app-models/dictionary';
import { OfficeSpecialityBindingModel, OfficeSpecialityViewModel } from '../app-models/office';

@Injectable({
  providedIn: 'root'
})
export class OfficeSpecialtiesService {
  private url = environment.apiUrl + 'OfficeSpeciality/';
  private dictionaryUrl = environment.apiUrl + 'dictionary/'
  private isLoading$ = new BehaviorSubject<boolean>(false);
  private isLoadingEligible$ = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }
  createSpecialtyForm(officeId: number): FormGroup {
    const frm = new FormGroup({
      OfficeId: new FormControl(officeId, Validators.required),
      SpecialityId: new FormControl('', Validators.required)
    });
    return frm;
  }
  getOfficeSpecialties(id: number): Observable<OfficeSpecialityViewModel[]> {
    this.isLoading$.next(true)
    return this.http.get<OfficeSpecialityViewModel[]>(this.url +'?officeId='+ id).pipe(
      finalize(() => this.isLoading$.next(false))
    )
  }

  getEligibleSpecialties(id: number): Observable<Specialty[]> {
    this.isLoadingEligible$.next(true);
    return this.http.get<Specialty[]>(this.dictionaryUrl + 'office-type-specialities/' + id).pipe(
      finalize(() => this.isLoadingEligible$.next(false))
    )
  }
  addOfficeSpecialty(model: OfficeSpecialityBindingModel): Observable<OfficeSpecialityViewModel> {
    this.isLoading$.next(true);
    return this.http.post<OfficeSpecialityViewModel>(this.url, model).pipe(
      finalize(() => this.isLoading$.next(false))
    );
  }
  deleteOfficeSpecialty(id: number): Observable<OfficeSpecialityViewModel> {
    this.isLoading$.next(true);
    return this.http.delete<OfficeSpecialityViewModel>(this.url + id).pipe(
      finalize(() => this.isLoading$.next(false))
    );
  }
  get isLoading(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }
  get isLoadingEligible(): Observable<boolean> {
    return this.isLoadingEligible$.asObservable();
  }
}
