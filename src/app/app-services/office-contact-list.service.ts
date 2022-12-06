import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OfficeContactBindingModel, OfficeContactViewModel } from '../app-models/office';

@Injectable({
  providedIn: 'root'
})
export class OfficeContactListService {
  private url = environment.apiUrl + 'officecontact/';
  private isLoading$ = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }
  createContactForm(officeId: number): FormGroup {
    const frm = new FormGroup({
      OfficeId: new FormControl(officeId, Validators.required),
      ContactId: new FormControl('', Validators.required),
      PhoneNumber: new FormControl('', Validators.required)
    });
    return frm;
  }
  getOfficeContacts(id: number): Observable<OfficeContactViewModel[]> {
    this.isLoading$.next(true)
    return this.http.get<OfficeContactViewModel[]>(this.url + id).pipe(
      finalize(() => this.isLoading$.next(false))
    )
  }
  addOfficeContact(model: OfficeContactBindingModel): Observable<OfficeContactViewModel> {
    this.isLoading$.next(true);
    return this.http.post<OfficeContactViewModel>(this.url, model).pipe(
      finalize(() => this.isLoading$.next(false))
    );
  }
  deleteOfficeCoontact(id: number): Observable<OfficeContactViewModel> {
    this.isLoading$.next(true);
    return this.http.delete<OfficeContactViewModel>(this.url + id).pipe(
      finalize(() => this.isLoading$.next(false))
    );
  }
  get isLoading(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }
}
