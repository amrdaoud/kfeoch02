import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Area, Country, Governorate, OfficeEntity, OfficeLegalEntity, OfficeType, Specialty } from '../app-models/dictionary';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  private dictionaryUrl = environment.apiUrl + 'dictionary/';
  private officeTypes$ = new BehaviorSubject<OfficeType[]>([]);
  private officeTypesLoading$ = new BehaviorSubject<boolean>(false);

  private officeEntities$ = new BehaviorSubject<OfficeEntity[]>([]);
  private officeEntitiesLoading$ = new BehaviorSubject<boolean>(false);

  private officeLegalEntities$ = new BehaviorSubject<OfficeLegalEntity[]>([]);
  private officeLegalEntitiesLoading$ = new BehaviorSubject<boolean>(false);

  private countries$ = new BehaviorSubject<Country[]>([]);
  private countriesLoading$ = new BehaviorSubject<boolean>(false);

  private governorates$ = new BehaviorSubject<Governorate[]>([]);
  private governoratesLoading$ = new BehaviorSubject<boolean>(false);

  private areas$ = new BehaviorSubject<Area[]>([]);
  private areasLoading$ = new BehaviorSubject<boolean>(false);

  private specialties$ = new BehaviorSubject<Specialty[]>([]);
  private specialtiesLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.httpGetOfficeTypes().subscribe();
    this.httpGetOfficeEntities().subscribe();
    this.httpGetOfficeLegalEntities().subscribe();
    this.httpGetCountries().subscribe();
    this.httpGetGovernorates().subscribe();
    this.httpGetAreas().subscribe();
  }

  httpGetOfficeTypes(): Observable<OfficeType[]> {
    this.officeTypesLoading$.next(true);
    return this.http.get<OfficeType[]>(this.dictionaryUrl + 'office-types').pipe(
      tap(x => this.officeTypes$.next(x)),
      finalize(() => this.officeTypesLoading$.next(false))
    )
  }
  httpGetOfficeEntities(): Observable<OfficeEntity[]> {
    return this.http.get<OfficeEntity[]>(this.dictionaryUrl + 'office-entities').pipe(
      tap(x => this.officeEntities$.next(x)),
      finalize(() => this.officeEntitiesLoading$.next(false))
    )
  }
  httpGetOfficeLegalEntities(): Observable<OfficeLegalEntity[]> {
    return this.http.get<OfficeLegalEntity[]>(this.dictionaryUrl + 'office-legal-entities').pipe(
      tap(x => this.officeLegalEntities$.next(x)),
      finalize(() => this.officeLegalEntitiesLoading$.next(false))
    )
  }
  httpGetCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.dictionaryUrl + 'countries').pipe(
      tap(x => this.countries$.next(x)),
      finalize(() => this.countriesLoading$.next(false))
    )
  }
  httpGetGovernorates(): Observable<Governorate[]> {
    return this.http.get<Governorate[]>(this.dictionaryUrl + `governorates`).pipe(
      tap(x => this.governorates$.next(x)),
      finalize(() => this.governoratesLoading$.next(false))
    )
  }
  httpGetAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(this.dictionaryUrl + `GetAllAreas`).pipe(
      tap(x => this.areas$.next(x)),
      finalize(() => this.areasLoading$.next(false))
    )
  }
  httpGetGovernoratesByCountry(id: number): Observable<Governorate[]> {
    return this.http.get<Governorate[]>(this.dictionaryUrl + `governorate-locations/${id}`).pipe(
      tap(x => this.governorates$.next(x)),
      finalize(() => this.governoratesLoading$.next(false))
    )
  }
  httpGetAreasByGovernorate(id: number): Observable<Area[]> {
    return this.http.get<Area[]>(this.dictionaryUrl + `area-locations/${id}`).pipe(
      tap(x => this.areas$.next(x)),
      finalize(() => this.areasLoading$.next(false))
    )
  }
  httpGetSpecialties(): Observable<Specialty[]> {
      return this.http.get<Specialty[]>(this.dictionaryUrl + 'office-specialties').pipe(
        tap(x => this.specialties$.next(x)),
        finalize(() => this.specialtiesLoading$.next(false))
    )
  }

  ///elements
  get officeTypes(): Observable<OfficeType[]> {
    return this.officeTypes$.asObservable();
  }
  get officeTypesLoading(): Observable<boolean> {
    return this.officeTypesLoading$.asObservable();
  }

  get officeEntities(): Observable<OfficeEntity[]> {
    return this.officeEntities$.asObservable();
  }
  get officeEntitiesLoading(): Observable<boolean> {
    return this.officeEntitiesLoading$.asObservable();
  }
  get officeLegalEntities(): Observable<OfficeLegalEntity[]> {
    return this.officeEntities$.asObservable();
  }
  get officeLegalEntitiesLoading(): Observable<boolean> {
    return this.officeEntitiesLoading$.asObservable();
  }


  get countries(): Observable<Country[]> {
    return this.countries$.asObservable();
  }
  get countriesLoading(): Observable<boolean> {
    return this.countriesLoading$.asObservable();
  }
  get governorates(): Observable<Governorate[]> {
    return this.governorates$.asObservable();
  }
  get governoratesLoading(): Observable<boolean> {
    return this.governoratesLoading$.asObservable();
  }
  get areas(): Observable<Area[]> {
    return this.areas$.asObservable();
  }
  get areasLoading(): Observable<boolean> {
    return this.areasLoading$.asObservable();
  }

  get specialties(): Observable<Specialty[]> {
    return this.specialties$.asObservable();
  }
  get specialtiesLoading(): Observable<boolean> {
    return this.specialtiesLoading$.asObservable();
  }

}
