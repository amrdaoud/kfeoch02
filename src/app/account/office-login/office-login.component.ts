import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/app-services/account.service';
import LanguageService from 'src/app/app-services/language.service';

@Component({
  selector: 'app-office-login',
  templateUrl: './office-login.component.html',
  styleUrls: ['./office-login.component.scss']
})
export class OfficeLoginComponent implements OnInit {
  frm = this.accountService.createOfficeLoginForm();
  officeTypes = this.accountService.officeTypes;
  officeTypesLoading = this.accountService.officeTypesLoading;
  isLogging = this.accountService.isLogging;
  language = this.languageService.currentLanguage;
  constructor(private accountService: AccountService,
              private languageService: LanguageService,
              private snackBar: MatSnackBar,
              private router: Router,
              private translateService: TranslateService) { }
  ngOnInit(): void {
  }
  login() {
    if(this.frm.invalid) {
      return;
    }
    this.accountService.httpOfficeLogin(this.frm.value).subscribe(x => {
      if(x && x.IsAuthenticated) {
        this.router.navigateByUrl('/office/home/information');
      }
      else {
        this.snackBar.open(this.translateService.instant('Please Check Type, License or Password!'),this.translateService.instant('Dismiss'),{duration: 2000})
      }
    })
  }

}
