import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, map, switchMap, tap } from 'rxjs';
import { Specialty } from 'src/app/app-models/dictionary';
import { License } from 'src/app/app-models/office-licenses';
import { DeviceService } from 'src/app/app-services/device.service';
import { DictionaryService } from 'src/app/app-services/dictionary.service';
import LanguageService from 'src/app/app-services/language.service';
import { OfficeLicenseService } from 'src/app/app-services/office-license.service';
import { OfficeSpecialtiesService } from 'src/app/app-services/office-specialties.service';

@Component({
  selector: 'app-license-form-edit',
  templateUrl: './license-form-edit.component.html',
  styleUrls: ['./license-form-edit.component.scss']
})
export class LicenseFormEditComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  frm!: FormGroup;
  isLoading = this.licenseService.isLoading$;
  officeSpecialities: Specialty[] = [];
  officeEntities = this.dictionaryService.officeEntities;
  officeEntitiesLoading = this.dictionaryService.officeEntitiesLoading;
  officeSpecialitiesLoading = this.specialityService.isLoadingEligible;
  language$ = this.languageService.currentLanguage$;
  model!: License;
  eligibleSpecialities: Specialty[] = [];
  downloadingFile$ = this.licenseService.downloadingFile$;
  constructor(private deviceService: DeviceService,
              private route: ActivatedRoute,
              private licenseService: OfficeLicenseService,
              private dictionaryService: DictionaryService,
              private specialityService: OfficeSpecialtiesService,
              private languageService:LanguageService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
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
        this.frm.disable();
      })
      )
      .subscribe(
      x => this.officeSpecialities = x
      );
  }
  save() {

  }
  reset() {
  }
  fileSelected(event: any) {

  }
  downloadFile() {
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
  // downloadFile() {
  //   return this.licenseService.getFile(this.model.Id).subscribe(x => {
  //     let dataType = x.type;
  //     let binaryData = [];
  //     binaryData.push(x);
  //     let downloadLink = document.createElement('a');
  //     downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
  //     downloadLink.setAttribute('download', this.model.Id.toString());
  //     document.body.appendChild(downloadLink);
  //     downloadLink.click();
  //   });
  // }
  openFileInNewWindow() {
    return this.licenseService.getFile(this.model.Id).subscribe(x => {
      window.open("data:application/pdf;charset=UTF-8," + encodeURIComponent(x));
    });
  }

}
