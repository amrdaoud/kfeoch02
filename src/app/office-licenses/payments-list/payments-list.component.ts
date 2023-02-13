import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { paymentColumns, PaymentDetailsModel } from 'src/app/app-models/office-licenses';
import { ColumnDef } from 'src/app/app-models/shared';
import { AccountService } from 'src/app/app-services/account.service';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';
import { OfficeLicenseService } from 'src/app/app-services/office-license.service';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.scss']
})
export class PaymentsListComponent implements OnInit {
  officeId = this.accountService.getOfficeId();
  isHandset = this.deviceService.isHandset$;
  isLoading = this.licenseService.isLoading$;
  columns: ColumnDef[] = [];
  payments!: Observable<PaymentDetailsModel[]>;
  language$ = this.languageService.currentLanguage$;
  constructor(private route: ActivatedRoute,
              private accountService: AccountService,
              private deviceService: DeviceService,
              private languageService: LanguageService,
              private licenseService: OfficeLicenseService,
              private router: Router) { }

  ngOnInit(): void {
    this.isHandset.subscribe(x => {
      if(x) {
        this.columns = paymentColumns.handset
      }
      else {
        this.columns = paymentColumns.nonHandset;
      }
    })
    this.payments = this.route.parent?.parent?.parent?.paramMap.pipe(
      map((param: ParamMap) => {
        if(param.get('id')) {
          this.officeId = +param.get('id')!;
          return this.officeId;
        }
        else {
          return this.officeId ?? 0
        }
      }),
      switchMap(() => {
        return this.licenseService.getRenewPaymentsByOfficeId(this.officeId!)
      })
    )!;
  }
  goToPayment(payment: PaymentDetailsModel) {
    this.router.navigateByUrl('/printables/payments/'+payment.Id)
  }

}
