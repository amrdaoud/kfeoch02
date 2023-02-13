import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, Observable, switchMap, tap } from 'rxjs';
import { License, licenseColumns } from 'src/app/app-models/office-licenses';
import { ColumnDef } from 'src/app/app-models/shared';
import { AccountService } from 'src/app/app-services/account.service';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';
import { OfficeLicenseService } from 'src/app/app-services/office-license.service';

@Component({
  selector: 'app-license-list',
  templateUrl: './license-list.component.html',
  styleUrls: ['./license-list.component.scss']
})
export class LicenseListComponent implements OnInit {
  officeId = this.accountService.getOfficeId();
  licenses!: Observable<License[]>;
  isHandset = this.deviceService.isHandset$;
  isLoading = this.licenseService.isLoading$;
  columns: ColumnDef[] = [];
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
        this.columns = licenseColumns.handset
      }
      else {
        this.columns = licenseColumns.nonHandset;
      }
    })
    this.licenses = this.route.parent?.parent?.parent?.paramMap.pipe(
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
        return this.licenseService.getOfficeLicenses(this.officeId!)
      })
    )!;
  }
  goToLicense(license: License) {
    this.router.navigate(['edit',license.Id], {relativeTo: this.route.parent});
  }

}
