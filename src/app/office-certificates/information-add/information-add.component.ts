import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { exhaustMap, filter, map, switchMap, tap } from 'rxjs';
import { AccountService } from 'src/app/app-services/account.service';
import { ConfirmService } from 'src/app/app-services/confirm.service';
import { DeviceService } from 'src/app/app-services/device.service';
import { DictionaryService } from 'src/app/app-services/dictionary.service';
import LanguageService from 'src/app/app-services/language.service';
import { OfficeCertificateService } from 'src/app/app-services/office-certificate.service';

@Component({
  selector: 'app-information-add',
  templateUrl: './information-add.component.html',
  styleUrls: ['./information-add.component.scss']
})
export class InformationAddComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  officeId = this.accountService.getOfficeId();
  requestTypes = this.dictionaryService.requestTypes;
  requestTypesLoading = this.dictionaryService.requestTypesLoading;
  language$ = this.languageService.currentLanguage$;
  frm!: FormGroup;
  price = 0;
  constructor(private deviceService: DeviceService,
              private accountService :AccountService,
              private dictionaryService: DictionaryService,
              private route: ActivatedRoute,
              private certificateService: OfficeCertificateService,
              private languageService: LanguageService,
              private confirm: ConfirmService) { }

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
      map(() => {
        return this.frm.get('RequestTypeId')?.value!
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
    if(this.frm.invalid) {
      return;
    }
    this.confirm.open({Type: 'request'}).pipe(
      filter(x => x),
      exhaustMap(() => this.certificateService.postRequestKpay(this.frm.getRawValue()))
    ).subscribe(r => window.open(r.PaymentUrl,'_self'))
  }

}
