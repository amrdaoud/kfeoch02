import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, delay, finalize, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Activity, Area, CertificateEntity, ContactType, Country, DictionaryModel, DictionaryTemplate, DocumentType, Gender, Governorate, Nationality, OfficeEntity, OfficeLegalEntity, OfficeType, Position, PostCategory, RequestType, Specialty } from '../app-models/dictionary';
import { Office } from '../app-models/office';
import { DynamicTableByndingModel, DynamicTableResult } from '../app-models/shared';
@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  private dictionaryUrl = environment.apiUrl + 'dictionary/';
  private officeFilterUrl = environment.apiUrl + 'office/filter';
  private offices$ = new BehaviorSubject<Office[]>([]);
  private officesLoading$ = new BehaviorSubject<boolean>(false);

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

  private activities$ = new BehaviorSubject<Activity[]>([]);
  private activitiesLoading$ = new BehaviorSubject<boolean>(false);

  private genders$ = new BehaviorSubject<Gender[]>([]);
  private gendersLoading$ = new BehaviorSubject<boolean>(false);

  private memberSpecialties$ = new BehaviorSubject<Specialty[]>([]);
  private memberSpecialtiesLoading$ = new BehaviorSubject<boolean>(false);

  private contactTypes$ = new BehaviorSubject<ContactType[]>([]);
  private contactTypesLoading$ = new BehaviorSubject<boolean>(false);

  private memberDocumentTypes$ = new BehaviorSubject<DocumentType[]>([]);
  private memberDocumentTypesLoading$ = new BehaviorSubject<boolean>(false);

  private officeDocumentTypes$ = new BehaviorSubject<DocumentType[]>([]);
  private officeDocumentTypesLoading$ = new BehaviorSubject<boolean>(false);

  private memberPositions$ = new BehaviorSubject<Specialty[]>([]);
  private memberPositionsLoading$ = new BehaviorSubject<boolean>(false);

  private nationalities$ = new BehaviorSubject<Nationality[]>([]);
  private nationalitiesLoading$ = new BehaviorSubject<boolean>(false);

  private postCategories$ = new BehaviorSubject<PostCategory[]>([]);
  private postCategoriesLoading$ = new BehaviorSubject<boolean>(false);

  private requestTypes$ = new BehaviorSubject<RequestType[]>([]);
  private requestTypesLoading$ = new BehaviorSubject<boolean>(false);

  private certificateEntities$ = new BehaviorSubject<CertificateEntity[]>([]);
  private certificateEntitiesLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    // this.httpGetOfficeTypes().subscribe();
    // this.httpGetOfficeEntities().subscribe();
    // this.httpGetOfficeLegalEntities().subscribe();
    // this.httpGetCountries().subscribe();
    // this.httpGetGovernorates().subscribe();
    // this.httpGetAreas().subscribe();
    // this.httpGetGenders().subscribe();
    // this.httpGetMemberSpecialities().subscribe();
    // this.httpGetContactTypes().subscribe();
    // this.httpGetSpecialties().subscribe();
    // this.httpGetActivities().subscribe();
    // this.httpGetMemberDocumentTypes().subscribe();
    // this.httpGetOfficeDocumentTypes().subscribe();
    // this.httpGetMemberPositions().subscribe();
    // this.httpGetNationalities().subscribe();
    // this.httpGetPostCategories().subscribe();
    // this.httpGetRequestTypes().subscribe();
    // this.httpGetCertificateEntities().subscribe();
  }

  httpGetOfficess(): Observable<Office[]> {
    this.officesLoading$.next(true);
    const filter = new DynamicTableByndingModel();
    filter.PageSize = 3000;
    return this.http.post<DynamicTableResult>(this.officeFilterUrl, filter).pipe(
      map(x => x.Data.sort((a,b) => a.NameArabic < b.NameArabic ? -1 : a.NameArabic < b.NameArabic ? 1 : 0) ),
      tap(x => this.offices$.next(x)),
      finalize(() => this.officesLoading$.next(false))
    )
  }

  httpGetOfficeTypes(): Observable<OfficeType[]> {
    this.officeTypesLoading$.next(true);
    return this.http.get<OfficeType[]>(this.dictionaryUrl + 'office-types').pipe(
      tap(x => this.officeTypes$.next(x)),
      finalize(() => this.officeTypesLoading$.next(false))
    )
  }
  httpGetNationalities(): Observable<Nationality[]> {
    this.nationalitiesLoading$.next(true);
    return this.http.get<Nationality[]>(this.dictionaryUrl + 'nationalities').pipe(
      tap(x => this.nationalities$.next(x)),
      finalize(() => this.nationalitiesLoading$.next(false))
    )
  }
  httpGetOfficeEntities(): Observable<OfficeEntity[]> {
    this.officeEntitiesLoading$.next(true)
    return this.http.get<OfficeEntity[]>(this.dictionaryUrl + 'office-entities').pipe(
      tap(x => this.officeEntities$.next(x)),
      finalize(() => this.officeEntitiesLoading$.next(false))
    )
  }
  httpGetOfficeLegalEntities(): Observable<OfficeLegalEntity[]> {
    this.officeLegalEntitiesLoading$.next(true)
    return this.http.get<OfficeLegalEntity[]>(this.dictionaryUrl + 'office-legal-entities').pipe(
      tap(x => this.officeLegalEntities$.next(x)),
      finalize(() => this.officeLegalEntitiesLoading$.next(false))
    )
  }
  httpGetCountries(): Observable<Country[]> {
    this.countriesLoading$.next(true)
    return this.http.get<Country[]>(this.dictionaryUrl + 'countries').pipe(
      tap(x => this.countries$.next(x)),
      finalize(() => this.countriesLoading$.next(false))
    )
  }
  httpGetGovernorates(): Observable<Governorate[]> {
    this.governoratesLoading$.next(true)
    return this.http.get<Governorate[]>(this.dictionaryUrl + `governorates`).pipe(
      tap(x => this.governorates$.next(x)),
      finalize(() => this.governoratesLoading$.next(false))
    )
  }
  httpGetAreas(): Observable<Area[]> {
    this.areasLoading$.next(true)
    return this.http.get<Area[]>(this.dictionaryUrl + `areas`).pipe(
      tap(x => this.areas$.next(x)),
      finalize(() => this.areasLoading$.next(false))
    )
  }
  httpGetGovernoratesByCountry(id: number): Observable<Governorate[]> {
    this.governoratesLoading$.next(true)
    return this.http.get<Governorate[]>(this.dictionaryUrl + `governorate-locations/${id}`).pipe(
      tap(x => this.governorates$.next(x)),
      finalize(() => this.governoratesLoading$.next(false))
    )
  }
  httpGetAreasByGovernorate(id: number): Observable<Area[]> {
    this.areasLoading$.next(true)
    return this.http.get<Area[]>(this.dictionaryUrl + `area-locations/${id}`).pipe(
      tap(x => this.areas$.next(x)),
      finalize(() => this.areasLoading$.next(false))
    )
  }
  httpGetSpecialties(): Observable<Specialty[]> {
    this.specialtiesLoading$.next(true)
      return this.http.get<Specialty[]>(this.dictionaryUrl + 'office-specialities').pipe(
        tap(x => this.specialties$.next(x)),
        finalize(() => this.specialtiesLoading$.next(false))
    )
  }
  httpGetActivities(): Observable<Specialty[]> {
    this.activitiesLoading$.next(true)
    return this.http.get<Specialty[]>(this.dictionaryUrl + 'office-activities').pipe(
      tap(x => this.activities$.next(x)),
      finalize(() => this.activitiesLoading$.next(false))
  )
}
  httpGetGenders(): Observable<Gender[]> {
    this.gendersLoading$.next(true)
    return this.http.get<Gender[]>(this.dictionaryUrl + 'genders').pipe(
      tap(x => this.genders$.next(x)),
      finalize(() => this.gendersLoading$.next(false))
  )
  }
  httpGetMemberSpecialities(): Observable<Specialty[]> {
    this.memberSpecialtiesLoading$.next(true)
    return this.http.get<Specialty[]>(this.dictionaryUrl + 'office-owner-specialities').pipe(
      tap(x => this.memberSpecialties$.next(x)),
      finalize(() => this.memberSpecialtiesLoading$.next(false))
  )
  }
  httpGetMemberPositions(): Observable<Position[]> {
    this.memberPositionsLoading$.next(true)
    return this.http.get<Specialty[]>(this.dictionaryUrl + 'office-owner-positions').pipe(
      tap(x => this.memberPositions$.next(x)),
      finalize(() => this.memberPositionsLoading$.next(false))
  )
  }
  httpGetContactTypes(): Observable<ContactType[]> {
    this.contactTypesLoading$.next(true)
    return this.http.get<ContactType[]>(this.dictionaryUrl + 'contact-types').pipe(
      tap(x => this.contactTypes$.next(x)),
      finalize(() => this.contactTypesLoading$.next(false))
  )
  }
  httpGetMemberDocumentTypes(): Observable<DocumentType[]> {
    this.memberDocumentTypesLoading$.next(true);
    return this.http.get<DocumentType[]>(this.dictionaryUrl + 'owner-document-types').pipe(
      tap(x => this.memberDocumentTypes$.next(x)),
      finalize(() => this.memberDocumentTypesLoading$.next(false))
  )
  }
  httpGetOfficeDocumentTypes(): Observable<DocumentType[]> {
    this.officeDocumentTypesLoading$.next(true);
    return this.http.get<DocumentType[]>(this.dictionaryUrl + 'office-document-types').pipe(
      tap(x => this.officeDocumentTypes$.next(x)),
      finalize(() => this.officeDocumentTypesLoading$.next(false))
  )
  }

  httpGetPostCategories(): Observable<PostCategory[]> {
    this.postCategoriesLoading$.next(true);
    return this.http.get<DocumentType[]>(this.dictionaryUrl + 'post-categories').pipe(
      tap(x => this.postCategories$.next(x)),
      finalize(() => this.postCategoriesLoading$.next(false))
  )
  }

  httpGetCertificateEntities(): Observable<CertificateEntity[]> {
    this.certificateEntitiesLoading$.next(true);
    return this.http.get<CertificateEntity[]>(this.dictionaryUrl + 'certificate-entities').pipe(
      tap(x => this.certificateEntities$.next(x)),
      finalize(() => this.certificateEntitiesLoading$.next(false))
    )
  }

  httpGetRequestTypes(): Observable<RequestType[]> {
    this.requestTypesLoading$.next(true);
    return this.http.get<RequestType[]>(this.dictionaryUrl + 'request-types').pipe(
      tap(x => this.requestTypes$.next(x)),
      finalize(() => this.requestTypesLoading$.next(false))
    )
  }

  getDictionaryTemplate(urlName: string): DictionaryTemplate | null {
    return urlName === 'office-types' ? new DictionaryTemplate (urlName, 'Office Types', this.officeTypes, this.officeTypesLoading, false, this.buildForm())
    : urlName === 'office-specialities' ? new DictionaryTemplate (urlName, 'Office Specialities', this.specialties,this.specialtiesLoading, true, this.buildForm(true), this.officeTypes, 'Office Type', this.officeTypesLoading)
    : urlName === 'office-activities' ? new DictionaryTemplate (urlName, 'Office Activities', this.activities,this.activitiesLoading, true, this.buildForm(true), this.officeTypes, 'Office Type', this.officeTypesLoading)
    : urlName === 'office-entities' ? new DictionaryTemplate (urlName, 'Office Entities', this.officeEntities,this.officeEntitiesLoading, false, this.buildForm(false,true),undefined,undefined,undefined,true,'YearlyFees')
    : urlName === 'request-types' ? new DictionaryTemplate (urlName, 'Request Types', this.requestTypes,this.requestTypesLoading, false, this.buildForm(false,false,true),undefined,undefined,undefined,true,'Amount')
    : urlName === 'certificate-entities' ? new DictionaryTemplate (urlName, 'Certificate Entities', this.certificateEntities,this.certificateEntitiesLoading, false, this.buildForm())
    : urlName === 'office-legal-entities' ? new DictionaryTemplate (urlName, 'Office Legal Entities', this.officeLegalEntities,this.officeLegalEntitiesLoading, false, this.buildForm())
    : urlName === 'contact-types' ? new DictionaryTemplate (urlName, 'Contact Types', this.contactTypes,this.contactTypesLoading, false, this.buildForm())
    : urlName === 'post-categories' ? new DictionaryTemplate (urlName, 'Post Categories', this.postCategories,this.postCategoriesLoading, false, this.buildForm())
    : urlName === 'countries' ? new DictionaryTemplate (urlName, 'Countries', this.countries,this.countriesLoading, false, this.buildForm())
    : urlName === 'governorates' ? new DictionaryTemplate (urlName, 'Governorates', this.governorates,this.governoratesLoading, true, this.buildForm(true), this.countries, 'Country', this.countriesLoading)
    : urlName === 'areas' ? new DictionaryTemplate (urlName, 'Areas', this.areas,this.areasLoading, true, this.buildForm(true), this.governorates, 'Governorate', this.governoratesLoading)
    : urlName === 'office-owner-specialities' ? new DictionaryTemplate (urlName, 'Member Specialities',this.memberSpecialties ,this.memberSpecialtiesLoading, false, this.buildForm())
    : urlName === 'office-owner-positions' ? new DictionaryTemplate (urlName, 'Member Positions',this.memberPositions ,this.memberPositionsLoading, false, this.buildForm())
    : urlName === 'owner-document-types' ? new DictionaryTemplate (urlName, 'Member Documents',this.memberDocumentTypes ,this.memberDocumentTypesLoading, false, this.buildForm())
    : urlName === 'office-document-types' ? new DictionaryTemplate (urlName, 'Office Documents',this.officeDocumentTypes ,this.officeDocumentTypesLoading, false, this.buildForm())
    : null;
  }
  private getCurrentSubject(urlName: string): {dataSubject: BehaviorSubject<any[]>, loadingSubject: BehaviorSubject<boolean>} {
    return urlName === 'office-types' ? {dataSubject: this.officeTypes$, loadingSubject: this.officeTypesLoading$}
    : urlName === 'office-specialities' ? {dataSubject: this.specialties$, loadingSubject: this.specialtiesLoading$}
    : urlName === 'office-activities' ? {dataSubject: this.activities$, loadingSubject: this.activitiesLoading$}
    : urlName === 'office-entities' ? {dataSubject: this.officeEntities$, loadingSubject: this.officeEntitiesLoading$}
    : urlName === 'request-types' ? {dataSubject: this.requestTypes$, loadingSubject: this.requestTypesLoading$}
    : urlName === 'certificate-entities' ? {dataSubject: this.certificateEntities$, loadingSubject: this.certificateEntitiesLoading$}
    : urlName === 'office-legal-entities' ? {dataSubject: this.officeLegalEntities$, loadingSubject: this.officeLegalEntitiesLoading$}
    : urlName === 'contact-types' ? {dataSubject: this.contactTypes$, loadingSubject: this.contactTypesLoading$}
    : urlName === 'post-categories' ? {dataSubject: this.postCategories$, loadingSubject: this.postCategoriesLoading$}
    : urlName === 'countries' ? {dataSubject: this.countries$, loadingSubject: this.countriesLoading$}
    : urlName === 'governorates' ? {dataSubject: this.governorates$, loadingSubject: this.governoratesLoading$}
    : urlName === 'areas' ? {dataSubject: this.areas$, loadingSubject: this.areasLoading$}
    : urlName === 'office-owner-specialities' ? {dataSubject: this.memberSpecialties$, loadingSubject: this.memberSpecialtiesLoading$}
    : urlName === 'office-owner-positions' ? {dataSubject: this.memberPositions$, loadingSubject: this.memberPositionsLoading$}
    : urlName === 'owner-document-types' ? {dataSubject: this.memberDocumentTypes$, loadingSubject: this.memberDocumentTypesLoading$}
    : urlName === 'office-document-types' ? {dataSubject: this.officeDocumentTypes$, loadingSubject: this.officeDocumentTypesLoading$}
    : {dataSubject: this.officeTypes$, loadingSubject: this.officeTypesLoading$}
  }
  httpAddDictionary(urlName: string, model: DictionaryModel): Observable<any> {
    const subjectObject = this.getCurrentSubject(urlName);
    subjectObject.loadingSubject.next(true);
    return this.http.post(this.dictionaryUrl + urlName, model).pipe(
      tap(result => subjectObject.dataSubject.next([...subjectObject.dataSubject.value, result])),
      finalize(() => subjectObject.loadingSubject.next(false))
    )
  }
  httpEditDictionary(urlName: string, model: DictionaryModel): Observable<any> {
    const subjectObject = this.getCurrentSubject(urlName);
    subjectObject.loadingSubject.next(true);
    return this.http.put(this.dictionaryUrl + urlName + '/' + model.Id, model).pipe(
      tap(result => {
        const i = subjectObject.dataSubject.value.findIndex(x => x.Id === model.Id);
        subjectObject.dataSubject.value[i] = result;
        subjectObject.dataSubject.next([...subjectObject.dataSubject.value])
      }),
      finalize(() => subjectObject.loadingSubject.next(false))
    )
  }
  buildForm(haveParent?: boolean, haveYearlyFees?: boolean, haveAmount?: boolean): FormGroup {
    const frm = new FormGroup({
      Id: new FormControl('0', Validators.required),
      NameArabic: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      NameEnglish: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      DescriptionArabic: new FormControl(''),
      DescriptionEnglish: new FormControl(''),
      ParentId: new FormControl('', haveParent ? Validators.required : []),
      IsDeleted: new FormControl(false),
      YearlyFees: new FormControl('', haveYearlyFees ? Validators.required : []),
      Amount: new FormControl('', haveAmount ? Validators.required : [])
    });
    return frm;
  }
  ///elements
  get offices(): Observable<Office[]> {
    if(this.offices$.value.length === 0) {
      return this.httpGetOfficess();
    }
    return this.offices$.asObservable();
  }
  get officeTypes(): Observable<OfficeType[]> {
    if(this.officeTypes$.value.length === 0) {
      return this.httpGetOfficeTypes();
    }
    return this.officeTypes$.asObservable();
  }
  get officeTypesLoading(): Observable<boolean> {
    return this.officeTypesLoading$.asObservable();
  }

  get officeEntities(): Observable<OfficeEntity[]> {
    if(this.officeEntities$.value.length === 0) {
      return this.httpGetOfficeEntities();
    }
    return this.officeEntities$.asObservable();
  }
  get officeEntitiesLoading(): Observable<boolean> {
    return this.officeEntitiesLoading$.asObservable();
  }
  get officeLegalEntities(): Observable<OfficeLegalEntity[]> {
    if(this.officeLegalEntities$.value.length === 0) {
      return this.httpGetOfficeLegalEntities();
    }
    return this.officeLegalEntities$.asObservable();
  }
  get officeLegalEntitiesLoading(): Observable<boolean> {
    return this.officeLegalEntitiesLoading$.asObservable();
  }


  get countries(): Observable<Country[]> {
    if(this.countries$.value.length === 0) {
      return this.httpGetCountries();
    }
    return this.countries$.asObservable();
  }
  get countriesLoading(): Observable<boolean> {
    return this.countriesLoading$.asObservable();
  }
  get governorates(): Observable<Governorate[]> {
    if(this.governorates$.value.length === 0) {
      return this.httpGetGovernorates();
    }
    return this.governorates$.asObservable();
  }
  get governoratesLoading(): Observable<boolean> {
    return this.governoratesLoading$.asObservable();
  }
  get areas(): Observable<Area[]> {
    if(this.areas$.value.length === 0) {
      return this.httpGetAreas();
    }
    return this.areas$.asObservable();
  }
  get areasLoading(): Observable<boolean> {
    return this.areasLoading$.asObservable();
  }

  get specialties(): Observable<Specialty[]> {
    if(this.specialties$.value.length === 0) {
      return this.httpGetSpecialties();
    }
    return this.specialties$.asObservable();
  }
  get specialtiesLoading(): Observable<boolean> {
    return this.specialtiesLoading$.asObservable();
  }
  get activities(): Observable<Activity[]> {
    if(this.activities$.value.length === 0) {
      return this.httpGetActivities();
    }
    return this.activities$.asObservable();
  }
  get activitiesLoading(): Observable<boolean> {
    return this.activitiesLoading$.asObservable();
  }

  get genders(): Observable<Gender[]> {
    if(this.genders$.value.length === 0) {
      return this.httpGetGenders();
    }
    return this.genders$.asObservable();
  }
  get gendersLoading(): Observable<boolean> {
    return this.gendersLoading$.asObservable();
  }

  get memberSpecialties(): Observable<Specialty[]> {
    if(this.memberSpecialties$.value.length === 0) {
      return this.httpGetMemberSpecialities();
    }
    return this.memberSpecialties$.asObservable();
  }
  get memberSpecialtiesLoading(): Observable<boolean> {
    return this.memberSpecialtiesLoading$.asObservable();
  }
  get memberPositions(): Observable<Position[]> {
    if(this.memberPositions$.value.length === 0) {
      return this.httpGetMemberPositions();
    }
    return this.memberPositions$.asObservable();
  }
  get memberPositionsLoading(): Observable<boolean> {
    return this.memberPositionsLoading$.asObservable();
  }

  get contactTypes(): Observable<ContactType[]> {
    if(this.contactTypes$.value.length === 0) {
      return this.httpGetContactTypes();
    }
    return this.contactTypes$.asObservable();
  }
  get contactTypesLoading(): Observable<boolean> {
    return this.contactTypesLoading$.asObservable();
  }

  get memberDocumentTypes(): Observable<ContactType[]> {
    if(this.memberDocumentTypes$.value.length === 0) {
      return this.httpGetMemberDocumentTypes();
    }
    return this.memberDocumentTypes$.asObservable();
  }
  get memberDocumentTypesLoading(): Observable<boolean> {
    return this.memberDocumentTypesLoading$.asObservable();
  }

  get officeDocumentTypes(): Observable<ContactType[]> {
    if(this.officeDocumentTypes$.value.length === 0) {
      return this.httpGetOfficeDocumentTypes();
    }
    return this.officeDocumentTypes$.asObservable();
  }
  get officeDocumentTypesLoading(): Observable<boolean> {
    return this.officeDocumentTypesLoading$.asObservable();
  }

  get nationalities(): Observable<Nationality[]> {
    if(this.nationalities$.value.length === 0) {
      return this.httpGetNationalities();
    }
    return this.nationalities$.asObservable();
  }
  get nationalitiesLoading(): Observable<boolean> {
    return this.nationalitiesLoading$.asObservable();
  }

  get postCategories(): Observable<PostCategory[]> {
    if(this.postCategories$.value.length === 0) {
      return this.httpGetPostCategories();
    }
    return this.postCategories$.asObservable();
  }
  get postCategoriesLoading(): Observable<boolean> {
    return this.postCategoriesLoading$.asObservable();
  }

  get certificateEntities(): Observable<CertificateEntity[]> {
    if(this.certificateEntities$.value.length === 0) {
      return this.httpGetCertificateEntities();
    }
    return this.certificateEntities$.asObservable();
  }
  get certificateEntitiesLoading(): Observable<boolean> {
    return this.certificateEntitiesLoading$.asObservable();
  }

  get requestTypes(): Observable<RequestType[]> {
    if(this.requestTypes$.value.length === 0) {
      return this.httpGetRequestTypes();
    }
    return this.requestTypes$.asObservable();
  }
  get requestTypesLoading(): Observable<boolean> {
    return this.requestTypesLoading$.asObservable();
  }

}
