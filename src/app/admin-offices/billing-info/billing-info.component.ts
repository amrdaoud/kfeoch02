import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AdminBilling, adminBillingColumns } from 'src/app/app-models/office';
import { DynamicTableByndingModel, SelectFilter } from 'src/app/app-models/shared';
import { DeviceService } from 'src/app/app-services/device.service';
import { DictionaryService } from 'src/app/app-services/dictionary.service';
import LanguageService from 'src/app/app-services/language.service';
import { OfficeService } from 'src/app/app-services/office.service';

@Component({
  selector: 'app-billing-info',
  templateUrl: './billing-info.component.html',
  styleUrls: ['./billing-info.component.scss']
})
export class BillingInfoComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  data = new Observable<AdminBilling[]>();
  dataSize = this.officeService.billingSize$;
  columnsDef = adminBillingColumns.nonHandset;
  isLoading = this.officeService.isBillingLoading;
  language$ = this.languageService.currentLanguage$;
  filter!: DynamicTableByndingModel;
  selectFilters: SelectFilter[] = [
    {
      type: 'select',
      label: 'Office Type',
      labelArabic: 'نوع المكتب',
      propertyValue: 'Id',
      displayValue: 'NameEnglish',
      displayValueArabic: 'NameArabic',
      controlName: 'OfficeTypes',
      values: this.dictionaryService.officeTypes,
      isLoading: this.dictionaryService.officeTypesLoading,
      isMulti: true
    },
    {
      type: 'select',
      label: 'Payment Type',
      labelArabic: 'نوع الدفعة',
      propertyValue: 'value',
      displayValue: 'key',
      displayValueArabic: 'keyArabic',
      controlName: 'paymentCategoryEnglish',
      values: of([
        {key: 'All',keyArabic: 'الكل', value: null},
        {key: 'Renew',keyArabic: 'تجديد', value: 'Renew Registration'},
        {key: 'Certificate',keyArabic: 'شهادة', value: 'Certificate Request'}
      ]),
      isMulti: false
    },
    {
      type: 'auto-complete',
      label: 'Office',
      labelArabic: 'المكتب',
      propertyValue: 'Id',
      displayValue: 'NameEnglish',
      displayValueArabic: 'NameArabic',
      controlName: 'Offices',
      values: this.dictionaryService.offices,
      isMulti: true
    },
    {
      type: 'date',
      label:'From Date',
      labelArabic: 'من تاريح',
      controlName: 'DateFrom',
      updateOn: 'blur'
    },
    {
      type: 'date',
      label:'To Date',
      labelArabic: 'حتى تاريح',
      controlName: 'DateTo'
    }
  ]
  constructor(private deviceService:DeviceService,
              private languageService: LanguageService,
              private officeService: OfficeService,
              private router: Router,
              private dictionaryService: DictionaryService) { }

  ngOnInit(): void {
    this.isHandset.subscribe(x => {
      if(x) {
        this.columnsDef = adminBillingColumns.handset;
      }
      else {
        this.columnsDef = adminBillingColumns.nonHandset;
      }
    })
  }
  changeBinding(filterObservable: Observable<DynamicTableByndingModel>) {
    this.data = filterObservable.pipe(
      switchMap(filter => {
        this.filter = filter;
        return this.officeService.getBillingByFilter(filter)
      })
    );

  }
  exportExcel() {
    this.officeService.getBillingByFilter(this.filter).subscribe(x => console.log(x));
    this.officeService.exportBillingByFilter(this.filter).subscribe( x => {
      let dataType = x.type;
      let binaryData = [];
      binaryData.push(x);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        downloadLink.setAttribute('download', 'BillingData.xlsx');
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    )
  }
  goToPayment(bill: AdminBilling) {
    this.router.navigateByUrl('/printables/payments/' + bill.Id)
  }

}
