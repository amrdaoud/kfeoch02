import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { certificateColumns, OfficeCertificate } from 'src/app/app-models/office-certificates';
import { ColumnDef } from 'src/app/app-models/shared';
import { AccountService } from 'src/app/app-services/account.service';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';
import { OfficeCertificateService } from 'src/app/app-services/office-certificate.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {
  officeId = this.accountService.getOfficeId();
  certificates!: Observable<OfficeCertificate[]>;
  isHandset = this.deviceService.isHandset$;
  isLoading = this.certificateService.isLoading$;
  columns: ColumnDef[] = [];
  language$ = this.languageService.currentLanguage$;
  constructor(private deviceService: DeviceService,
              private languageService: LanguageService,
              private accountService: AccountService,
              private certificateService: OfficeCertificateService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.isHandset.subscribe(x => {
      if(x) {
        this.columns = certificateColumns.handset
      }
      else {
        this.columns = certificateColumns.nonHandset;
      }
    });
    this.certificates = this.route.parent?.parent?.parent?.paramMap.pipe(
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
        return this.certificateService.getAllOfficeCertificates(this.officeId!)
      })
    )!;
  }
  goToPayment(model: OfficeCertificate) {
    this.router.navigateByUrl('/printables/payments/'+model.PaymentId)
  }
  goToCertificate(model: OfficeCertificate) {
    this.router.navigateByUrl('/printables/certificates/'+model.Id);
  }

}
