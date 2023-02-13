import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private url = environment.apiUrl + 'report/'
  private isLoadingOffices = new BehaviorSubject<boolean>(false);
  private isLoadingOwners = new BehaviorSubject<boolean>(false);
  private isLoadingSpecialities = new BehaviorSubject<boolean>(false);
  private isLoadingContacts = new BehaviorSubject<boolean>(false);
  private isLoadingLicenses = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }
  getOfficesReport(): Observable<any> {
    this.isLoadingOffices.next(true);
    return this.http.get(this.url + 'offices',{responseType: 'blob'}).pipe(
      finalize(() => this.isLoadingOffices.next(false))
    )
  }

  getOwnersReport(): Observable<any> {
    this.isLoadingOwners.next(true);
    return this.http.get(this.url + 'owners',{responseType: 'blob'}).pipe(
      finalize(() => this.isLoadingOwners.next(false))
    )
  }

  getSpecialitiesReport(): Observable<any> {
    this.isLoadingSpecialities.next(true);
    return this.http.get(this.url + 'specialities',{responseType: 'blob'}).pipe(
      finalize(() => this.isLoadingSpecialities.next(false))
    )
  }

  getContactsReport(): Observable<any> {
    this.isLoadingContacts.next(true);
    return this.http.get(this.url + 'contacts',{responseType: 'blob'}).pipe(
      finalize(() => this.isLoadingContacts.next(false))
    )
  }

  getLicensesReport(): Observable<any> {
    this.isLoadingLicenses.next(true);
    return this.http.get(this.url + 'licenses',{responseType: 'blob'}).pipe(
      finalize(() => this.isLoadingLicenses.next(false))
    )
  }

  get isLoadingOffices$(): Observable<boolean> {
    return this.isLoadingOffices.asObservable();
  }

  get isLoadingOwners$(): Observable<boolean> {
    return this.isLoadingOwners.asObservable();
  }

  get isLoadingSpecialities$(): Observable<boolean> {
    return this.isLoadingSpecialities.asObservable();
  }

  get isLoadingContacts$(): Observable<boolean> {
    return this.isLoadingContacts.asObservable();
  }
  get isLoadingLicenses$(): Observable<boolean> {
    return this.isLoadingLicenses.asObservable();
  }
}
