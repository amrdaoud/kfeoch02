import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { concatMap, exhaustMap, filter, map, merge, Observable, of, switchMap, tap } from 'rxjs';
import { Specialty } from 'src/app/app-models/dictionary';
import { License, PaymentModel } from 'src/app/app-models/office-licenses';
import { ConfirmService } from 'src/app/app-services/confirm.service';
import { DeviceService } from 'src/app/app-services/device.service';
import { DictionaryService } from 'src/app/app-services/dictionary.service';
import LanguageService from 'src/app/app-services/language.service';
import { OfficeLicenseService } from 'src/app/app-services/office-license.service';
import { OfficeSpecialtiesService } from 'src/app/app-services/office-specialties.service';

@Component({
  selector: 'app-admin-pending-license-form',
  templateUrl: './admin-pending-license-form.component.html',
  styleUrls: ['./admin-pending-license-form.component.scss']
})
export class AdminPendingLicenseFormComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  frm!: FormGroup;
  isLoading = this.licenseService.isLoading$;
  isLoadingPayments = this.licenseService.isLoadingPayments$;
  officeSpecialities: Specialty[] = [];
  officeEntities = this.dictionaryService.officeEntities;
  officeEntitiesLoading = this.dictionaryService.officeEntitiesLoading;
  officeSpecialitiesLoading = this.specialityService.isLoadingEligible;
  language$ = this.languageService.currentLanguage$;
  model!: License;
  eligibleSpecialities: Specialty[] = [];
  downloadingFile$ = this.licenseService.downloadingFile$;
  paymentInfo!: PaymentModel | null;
  constructor(private deviceService: DeviceService,
              private route: ActivatedRoute,
              private licenseService: OfficeLicenseService,
              private dictionaryService: DictionaryService,
              private specialityService: OfficeSpecialtiesService,
              private languageService:LanguageService,
              private router: Router,
              private confirm: ConfirmService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    {
      this.route.paramMap.pipe(
        map((param: ParamMap) => {
          if(param.get('id')) {
            return +param.get('id')!;
          }
          else {
            return 0
          }
        }),
        switchMap(id => this.licenseService.getLicenseById(id)),
        tap(license => {
          this.model = license;
        }),
        switchMap(license => this.specialityService.getEligibleSpecialties(license.OfficeId)),
        tap(eligibleSpecialities => {
          this.eligibleSpecialities = eligibleSpecialities;
          this.frm = this.licenseService.createOfficeLicenseForm(this.model.OfficeId,this.model, eligibleSpecialities);
        }),
        switchMap(() => this.licenseService.getPaymentsByOfficeId(this.model.OfficeId)),
        tap(x => this.paymentInfo = x),
        switchMap(() => this.frm.valueChanges),
        switchMap(val => this.licenseService.getPaymentByLicense(val))
        )
        .subscribe(x => this.paymentInfo = x);
    }
  }
  get file(): FormControl {
    return this.frm.get('file') as FormControl;
  }
  approve() {
    if(this.frm.invalid) {
      return;
    }
    this.confirm.open({Type: this.paymentInfo ? 'approve-license-payment' : 'approve-license'}).pipe(
      filter(x => x),
      exhaustMap(() => {
        return this.licenseService.approveLicense(this.model.Id, this.frm.value)
      })
    )
    .subscribe(x => {
      if(x) {
        this.router.navigateByUrl('/kfeoch-admin/licenses/pending-licenses')
      }
    });
  }
  reject() {
    this.confirm.open({Type: this.paymentInfo ? 'reject-license-payment' : 'reject-license'}).pipe(
      filter(x => x),
      exhaustMap(() => {
        return this.licenseService.rejectLicense(this.model.Id)
      })
    )
    .subscribe(x => {
      if(x) {
        this.router.navigateByUrl('/kfeoch-admin/licenses/pending-licenses')
      }
    });
  }
  downloadFile() {
    // return this.licenseService.getFile(this.model.Id).subscribe(x => {
    //   let dataType = x.type;
    //   let binaryData = [];
    //   binaryData.push(x);
    //   let downloadLink = document.createElement('a');
    //   downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
    //   downloadLink.setAttribute('download', this.model.Id.toString());
    //   document.body.appendChild(downloadLink);
    //   downloadLink.click();
    // });
    return this.licenseService.getFile(this.model.Id).subscribe(x => {
      // const fileUrl = URL.createObjectURL(x);
      // const safeUrl = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL,
      //   this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl))
      // const a = document.createElement('a');
      // a.target = '_blank';
      // a.href = safeUrl!;
      // console.log(a);
      // a.click();

      let dataType = x.type;
      let binaryData = [];
      binaryData.push(x);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
      downloadLink.setAttribute('download', this.model.Id.toString());
      document.body.appendChild(downloadLink);
      downloadLink.click();
    });

  }
  openFileInNewWindow() {
    return this.licenseService.getFile(this.model.Id).subscribe(x => {
      const fileUrl = URL.createObjectURL(x);
      window.open(fileUrl);
    });
  }
  combineValueChanges(): Observable<string> {
      return merge(this.frm.get('StartDate')?.valueChanges!, this.frm.get('EndDate')?.valueChanges!, this.frm.get('OfficeEntityId')?.valueChanges!)
  }
}
