import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { AccountService } from 'src/app/app-services/account.service';
import { ConfirmService } from 'src/app/app-services/confirm.service';
import LanguageService from 'src/app/app-services/language.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-office-nav',
  templateUrl: './office-nav.component.html',
  styleUrls: ['./office-nav.component.scss']
})
export class OfficeNavComponent implements OnInit {
  isTest = environment.test;
  language$ = this.languageService.currentLanguage$;
  language: string = this.languageService.currentLanguage;
  dir = this.languageService.currentDirection$;
  constructor(private accountService: AccountService,
              private router: Router,
              private confirm: ConfirmService,
              private languageService: LanguageService) { }

  ngOnInit(): void {
    this.language$.subscribe(x => this.language = x)
  }
  logOut() {
    this.confirm.open('Are you sure you want to logout?').pipe(
      filter(x => x)
    ).subscribe(() => {
      this.accountService.logOut();
      this.router.navigateByUrl('/account/login');
    })

  }
  changeLanguage(lang: string) {
    if(lang === this.language) {
      return;
    }
    this.languageService.changeLangageRefresh(lang);

  }

}
