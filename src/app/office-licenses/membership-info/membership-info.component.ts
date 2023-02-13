import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { exhaustMap, filter, map, switchMap } from 'rxjs';
import { PaymentModel } from 'src/app/app-models/office-licenses';
import { AccountService } from 'src/app/app-services/account.service';
import { ConfirmService } from 'src/app/app-services/confirm.service';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';
import { OfficeLicenseService } from 'src/app/app-services/office-license.service';

@Component({
  selector: 'app-membership-info',
  templateUrl: './membership-info.component.html',
  styleUrls: ['./membership-info.component.scss']
})
export class MembershipInfoComponent implements OnInit {
  language$ = this.languageService.currentLanguage$;
  isHandset = this.deviceService.isHandset$;
  officeId = this.accountService.getOfficeId();
  paymentInfo!: PaymentModel;
  isLoadingPayments = this.licenseService.isLoadingPayments$;
  constructor(private deviceService: DeviceService,
              private languageService: LanguageService,
              private accountService: AccountService,
              private licenseService: OfficeLicenseService,
              private route: ActivatedRoute,
              private confirm: ConfirmService) { }

  ngOnInit(): void {
    this.route.parent?.parent?.parent?.paramMap.pipe(
      map((param: ParamMap) => {
        if(param.get('id')) {
          this.officeId = +param.get('id')!;
          return this.officeId
        }
        else {
          return this.officeId ?? 0
        }
      }),
      switchMap(() => this.licenseService.getRenewInfoByOffice(this.officeId!))
    ).subscribe(x => this.paymentInfo = x);
  }
  renew() {
    this.confirm.open({Type:'renew'}).pipe(
      filter(x => x),
      exhaustMap(() => {
        return this.licenseService.renewOfficeKpay(this.officeId!,this.languageService.currentLanguage)
      })
    ).subscribe(r => window.open(r.PaymentUrl,'_self'))
  }

}

