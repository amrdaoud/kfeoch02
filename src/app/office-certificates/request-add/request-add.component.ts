import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { AccountService } from 'src/app/app-services/account.service';
import { DeviceService } from 'src/app/app-services/device.service';
import { DictionaryService } from 'src/app/app-services/dictionary.service';
import LanguageService from 'src/app/app-services/language.service';
import { OfficeCertificateService } from 'src/app/app-services/office-certificate.service';
import { OfficeLicenseService } from 'src/app/app-services/office-license.service';

@Component({
  selector: 'app-request-add',
  templateUrl: './request-add.component.html',
  styleUrls: ['./request-add.component.scss']
})
export class RequestAddComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  officeId = this.accountService.getOfficeId();
  requestTypes = this.dictionaryService.requestTypes;
  requestTypesLoading = this.dictionaryService.requestTypesLoading;
  certificateEntities = this.dictionaryService.certificateEntities;
  certificateEntitiesLoading = this.dictionaryService.certificateEntitiesLoading;
  language$ = this.languageService.currentLanguage$;
  frm!: FormGroup;
  price = 0;
  constructor(private deviceService: DeviceService,
              private accountService :AccountService,
              private dictionaryService: DictionaryService,
              private route: ActivatedRoute,
              private certificateService: OfficeCertificateService,
              private languageService: LanguageService) { }

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
        this.frm = this.certificateService.createInformationForm(this.officeId!);
      }),
      switchMap(() => {
        return this.frm.get('RequestTypeId')?.valueChanges!
      }),
      switchMap(val => {
        return this.requestTypes.pipe(
          map(t => t.find(x => x.Id === val)?.Amount)
        )
      })
    ).subscribe(
      x => {
        this.price = x!;
        console.log(x);
      }
    );
  }

  save() {

  }

  reset() {

  }

}
