import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Activity } from '../app-models/dictionary';
import { OfficeActivityBindingModel, OfficeActivityViewModel } from '../app-models/office';

@Injectable({
  providedIn: 'root'
})
export class OfficeActivitiesService {
  private url = environment.apiUrl + 'OfficeActivity/';
  private dictionaryUrl = environment.apiUrl + 'dictionary/'
  private isLoading$ = new BehaviorSubject<boolean>(false);
  private isLoadingEligible$ = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }

  createActivityForm(officeId: number): FormGroup {
    const frm = new FormGroup({
      OfficeId: new FormControl(officeId, Validators.required),
      ActivityId: new FormControl('', Validators.required)
    });
    return frm;
  }
  getOfficeActivities(id: number): Observable<OfficeActivityViewModel[]> {
    this.isLoading$.next(true)
    return this.http.get<OfficeActivityViewModel[]>(this.url +'?officeId='+ id).pipe(
      finalize(() => this.isLoading$.next(false))
    )
  }

  getEligibleActivities(id: number): Observable<Activity[]> {
    this.isLoadingEligible$.next(true);
    return this.http.get<Activity[]>(this.dictionaryUrl + 'office-type-activities/' + id).pipe(
      finalize(() => this.isLoadingEligible$.next(false))
    )
  }
  addOfficeActivity(model: OfficeActivityBindingModel): Observable<OfficeActivityViewModel> {
    this.isLoading$.next(true);
    return this.http.post<OfficeActivityViewModel>(this.url, model).pipe(
      finalize(() => this.isLoading$.next(false))
    );
  }
  deleteOfficeActivity(id: number): Observable<OfficeActivityViewModel> {
    this.isLoading$.next(true);
    return this.http.delete<OfficeActivityViewModel>(this.url + id).pipe(
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
