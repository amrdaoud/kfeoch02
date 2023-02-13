import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { exhaustMap, filter, map, switchMap, tap } from 'rxjs';
import { Specialty } from 'src/app/app-models/dictionary';
import { License } from 'src/app/app-models/office-licenses';
import { AccountService } from 'src/app/app-services/account.service';
import { ConfirmService } from 'src/app/app-services/confirm.service';
import { DeviceService } from 'src/app/app-services/device.service';
import { DictionaryService } from 'src/app/app-services/dictionary.service';
import LanguageService from 'src/app/app-services/language.service';
import { OfficeLicenseService } from 'src/app/app-services/office-license.service';
import { OfficeSpecialtiesService } from 'src/app/app-services/office-specialties.service';

@Component({
  selector: 'app-license-form-add',
  templateUrl: './license-form-add.component.html',
  styleUrls: ['./license-form-add.component.scss']
})
export class LicenseFormAddComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  officeId = this.accountService.getOfficeId();
  frm!: FormGroup;
  isLoading = this.licenseService.isLoading$;
  officeSpecialities: Specialty[] = [];
  officeEntities = this.dictionaryService.officeEntities;
  officeEntitiesLoading = this.dictionaryService.officeEntitiesLoading;
  officeSpecialitiesLoading = this.specialityService.isLoadingEligible;
  language$ = this.languageService.currentLanguage$;
  model!: License;
  constructor(private deviceService: DeviceService,
              private route: ActivatedRoute,
              private accountService: AccountService,
              private licenseService: OfficeLicenseService,
              private specialityService: OfficeSpecialtiesService,
              private dictionaryService: DictionaryService,
              private languageService: LanguageService,
              private confirm: ConfirmService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.parent?.parent?.parent?.paramMap.pipe(
      map((param: ParamMap) => {
        if(param.get('id')) {
          this.officeId = +param.get('id')!;
          return this.officeId;
        }
        else {
          return this.officeId ?? 0
        }
      }),
      tap(id => {
        this.frm = this.licenseService.createOfficeLicenseForm(this.officeId!,null);
      }),
      switchMap(id => this.specialityService.getEligibleSpecialties(id))
    ).subscribe(
      x => this.officeSpecialities = x
    );
  }
  save() {
    if(this.frm.invalid) {
      return;
    }
    this.confirm.open({Type: 'add-license'}).pipe(
      filter(x => x),
      exhaustMap(() => {
        return this.licenseService.addLicense(this.frm.value)
      })
    )
    .subscribe(x => {
      if(x) {
        this.router.navigate(['list'], {relativeTo: this.route.parent})
      }
    });
  }
  get file(): FormControl {
    return this.frm.get('file') as FormControl;
  }
  reset() {
    this.confirm.open({Type:'reset'}).pipe(
      filter(x => x)
    ).subscribe(() => {
      this.frm.reset();
    })

  }
  fileSelected(event: any) {
    if(!event.target?.files || event.target?.files.length === 0) {
      return;
    }
    const selectedFile = event.target.files[0];
    this.frm.get('file')?.setValue(selectedFile);
  }

}

