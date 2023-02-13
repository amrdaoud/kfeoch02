import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminLicense, adminLicenseColumns, License } from 'src/app/app-models/office-licenses';
import { ColumnDef } from 'src/app/app-models/shared';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';
import { OfficeLicenseService } from 'src/app/app-services/office-license.service';

@Component({
  selector: 'app-admin-pending-licenses',
  templateUrl: './admin-pending-licenses.component.html',
  styleUrls: ['./admin-pending-licenses.component.scss']
})
export class AdminPendingLicensesComponent implements OnInit {
  licenses!: Observable<AdminLicense[]>;
  isHandset = this.deviceService.isHandset$;
  isLoading = this.licenseService.isLoading$;
  columns: ColumnDef[] = [];
  language$ = this.languageService.currentLanguage$;
  constructor(private licenseService: OfficeLicenseService,
              private languageService: LanguageService,
              private deviceService: DeviceService,
              private router: Router) { }

  ngOnInit(): void {
    this.isHandset.subscribe(x => {
      if(x) {
        this.columns = adminLicenseColumns.handset
      }
      else {
        this.columns = adminLicenseColumns.nonHandset;
      }
    })
    this.licenses = this.licenseService.getPendingLicenses();
  }
  goToLicense(license: License) {
    this.router.navigateByUrl('/kfeoch-admin/licenses/pending-licenses/' + license.Id);
  }


}
