import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AdminOffice, adminOfficeColumns } from 'src/app/app-models/office';
import { DynamicTableByndingModel, SelectFilter } from 'src/app/app-models/shared';
import { DeviceService } from 'src/app/app-services/device.service';
import { DictionaryService } from 'src/app/app-services/dictionary.service';
import LanguageService from 'src/app/app-services/language.service';
import { OfficeService } from 'src/app/app-services/office.service';

@Component({
  selector: 'app-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.scss']
})
export class OfficeListComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  data = new Observable<AdminOffice[]>();
  dataSize = this.officeService.officeSize$;
  columnsDef = adminOfficeColumns.nonHandset;
  isLoading = this.officeService.isOfficeLoading;
  language$ = this.languageService.currentLanguage$;
  filter!: DynamicTableByndingModel;
  selectFilters: SelectFilter[] = [
    {
      type: 'select',
      label: 'Type',
      labelArabic: 'النوع',
      propertyValue: 'Id',
      displayValue: 'NameEnglish',
      displayValueArabic: 'NameArabic',
      controlName: 'Types',
      values: this.dictionaryService.officeTypes,
      isMulti: true
    },
    {
      type: 'select',
      label: 'Entity',
      labelArabic: 'الكيان',
      propertyValue: 'Id',
      displayValue: 'NameEnglish',
      displayValueArabic: 'NameArabic',
      controlName: 'Entities',
      values: this.dictionaryService.officeEntities,
      isMulti: true
    },
    {
      type: 'select',
      label: 'Legal Entity',
      labelArabic: 'الكيان القانوني',
      propertyValue: 'Id',
      displayValue: 'NameEnglish',
      displayValueArabic: 'NameArabic',
      controlName: 'LegalEntities',
      values: this.dictionaryService.officeLegalEntities,
      isMulti: true
    },
    {
      type:'select',
      label: 'Speciality',
      labelArabic: 'الاختصاص',
      propertyValue: 'Id',
      displayValue: 'NameEnglish',
      displayValueArabic: 'NameArabic',
      controlName: 'Specialities',
      values: this.dictionaryService.specialties,
      isMulti: true
    },
    {
      type:'select',
      label: 'Activity',
      labelArabic: 'النشاط',
      propertyValue: 'Id',
      displayValue: 'NameEnglish',
      displayValueArabic: 'NameArabic',
      controlName: 'Activities',
      values: this.dictionaryService.activities,
      isMulti: true
    },
    {
      type: 'select',
      label: 'Verified?',
      labelArabic: 'معتمد؟',
      propertyValue: 'value',
      displayValue: 'key',
      displayValueArabic: 'keyArabic',
      controlName: 'IsVerified',
      values: of([
        {key: 'All',keyArabic: 'الكل', value: null},
        {key: 'Yes',keyArabic: 'نعم', value: true},
        {key: 'No',keyArabic: 'لا', value: false}
      ]),
      isMulti: false
    },
    {
      type: 'select',
      label: 'Active?',
      labelArabic: 'نشط؟',
      propertyValue: 'value',
      displayValue: 'key',
      displayValueArabic: 'keyArabic',
      controlName: 'IsActive',
      values: of([
        {key: 'All',keyArabic: 'الكل', value: null},
        {key: 'Yes',keyArabic: 'نعم', value: true},
        {key: 'No',keyArabic: 'لا', value: false}
      ]),
      isMulti: false
    }
  ]
  constructor(private deviceService:DeviceService,
              private languageService: LanguageService,
              private officeService: OfficeService,
              private router: Router,
              private dictionaryService: DictionaryService) { }

  ngOnInit(): void {
    this.dataSize.subscribe(x => console.log(x));
    this.isHandset.subscribe(x => {
      if(x) {
        this.columnsDef = adminOfficeColumns.handset;
      }
      else {
        this.columnsDef = adminOfficeColumns.nonHandset;
      }
    })
  }

  changeBinding(filterObservable: Observable<DynamicTableByndingModel>) {
    this.data = filterObservable.pipe(
      switchMap(filter => {
        this.filter = filter;
        return this.officeService.getOfficesByFilter(filter)
      })
    );

  }
  goToOffice(office: AdminOffice) {
    this.router.navigateByUrl('/office/'+office.Id);
  }
  exportExcel() {
    this.officeService.exportOfficeByFilter(this.filter).subscribe( x => {
      let dataType = x.type;
      let binaryData = [];
      binaryData.push(x);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        downloadLink.setAttribute('download', 'OfficeData.xlsx');
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    )
  }

}
