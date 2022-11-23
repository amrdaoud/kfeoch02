import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/app-services/account.service';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';

@Component({
  selector: 'app-office-register',
  templateUrl: './office-register.component.html',
  styleUrls: ['./office-register.component.scss']
})
export class OfficeRegisterComponent implements OnInit {
  frm = this.accountService.createOfficeRegisterForm();
  officeTypes = this.accountService.officeTypes;
  officeTypesLoading = this.accountService.officeTypesLoading;
  isHandset = this.deviceService.isHandset$;
  isRegistering = this.accountService.isRegistering;
  language = this.languageService.currentLanguage;
  constructor(private accountService: AccountService,
              private languageService: LanguageService,
              private deviceService: DeviceService,
              private router: Router,
              private snackBar: MatSnackBar,
              private translateService: TranslateService) { }

  ngOnInit(): void {
  }
  register() {
    if(this.frm.invalid) {
      return;
    }
    this.accountService.httpOfficeRegister(this.frm.value).subscribe(x => {
      if(x && x.Success) {
        this.frm.reset();
        this.snackBar.open(x.Message!,this.translateService.instant('Dismiss'),{duration: 2000});
        this.router.navigateByUrl('/account/login')
      } else {
        this.snackBar.open(x?.Message!,this.translateService.instant('Dismiss'),{duration: 2000});
      }
    });
  }

}
