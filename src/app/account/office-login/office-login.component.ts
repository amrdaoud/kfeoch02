import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/app-services/account.service';
import { DictionaryService } from 'src/app/app-services/dictionary.service';
import LanguageService from 'src/app/app-services/language.service';

@Component({
  selector: 'app-office-login',
  templateUrl: './office-login.component.html',
  styleUrls: ['./office-login.component.scss']
})
export class OfficeLoginComponent implements OnInit {
  language$ = this.languageService.currentLanguage$;
  frm = this.accountService.createOfficeLoginForm();
  officeTypes = this.dictionaryService.officeTypes;
  officeTypesLoading = this.dictionaryService.officeTypesLoading;
  isLogging = this.accountService.isLogging;
  language = this.languageService.currentLanguage;
  returnUrl: string;
  constructor(private accountService: AccountService,
              private dictionaryService: DictionaryService,
              private languageService: LanguageService,
              route: ActivatedRoute
              ) {
                this.returnUrl = route.snapshot.queryParams['returnUrl']
              }
  ngOnInit(): void {
  }
  login() {
    if(this.frm.invalid) {
      return;
    }
    this.accountService.httpOfficeLogin(this.frm.value, this.returnUrl).subscribe();
  }

}
