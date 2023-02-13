import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/app-services/account.service';
import { DeviceService } from 'src/app/app-services/device.service';
import { DictionaryService } from 'src/app/app-services/dictionary.service';
import LanguageService from 'src/app/app-services/language.service';
import { SiteService } from 'src/app/app-services/site.service';
import { TermsConditionComponent } from '../terms-condition/terms-condition.component';

@Component({
  selector: 'app-office-register',
  templateUrl: './office-register.component.html',
  styleUrls: ['./office-register.component.scss']
})
export class OfficeRegisterComponent implements OnInit {
  language$ = this.languageService.currentLanguage$;
  frm = this.accountService.createOfficeRegisterForm();
  officeTypes = this.dictionaryService.officeTypes;
  officeTypesLoading = this.dictionaryService.officeTypesLoading;
  isHandset = this.deviceService.isHandset$;
  isRegistering = this.accountService.isRegistering;
  language = this.languageService.currentLanguage;
  isLoadingPage = this.siteService.isLoadingPage$;
  constructor(private accountService: AccountService,
              private languageService: LanguageService,
              private deviceService: DeviceService,
              private dictionaryService: DictionaryService,
              private router: Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private siteService: SiteService) { }

  ngOnInit(): void {
  }
  register() {
    if(this.frm.invalid) {
      return;
    }
    this.accountService.httpOfficeRegister(this.frm.value).subscribe(x => {
      if(x && x.Success) {
        this.frm.reset();
        this.snackBar.open(this.language === 'ar' ? x.MessageArabic! : x.Message!,this.languageService.translate('Dismiss'),{duration: 2000});
        this.router.navigateByUrl('/account/login')
      } else {
        this.snackBar.open(this.language === 'ar' ? x.MessageArabic! : x.Message!,this.languageService.translate('Dismiss'),{duration: 2000});
      }
    });
  }

  get aggree(): boolean {
    return this.frm.get('AggreeToTerms')?.value as boolean;
  }
  openTerms() {
    this.siteService.getPageByUrl('conditions',true).subscribe(x => {
      if(x) {
        this.dialog.open(TermsConditionComponent, {data:x, panelClass: 'dialog-no-padding'});
      }
    });
  }

}
