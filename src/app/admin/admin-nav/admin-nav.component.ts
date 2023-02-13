import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { admin, adminConfig, adminOffices } from 'src/app/app-models/routes-urls';
import { AccountService } from 'src/app/app-services/account.service';
import { ConfirmService } from 'src/app/app-services/confirm.service';
import LanguageService from 'src/app/app-services/language.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent implements OnInit {
  userName = this.accountService.getUserName();
  language$ = this.languageService.currentLanguage$;
  language: string = this.languageService.currentLanguage;
  dir = this.languageService.currentDirection$;
  routes = this.accountService.getMainRouteConfig(admin).map(
    x => {
      if(x.routerLink === '/kfeoch-admin/offices/') {
        x.routerLink += this.accountService.getFirstRoute(adminOffices)
      } else if (x.routerLink === '/kfeoch-admin/config/') {
        x.routerLink += this.accountService.getFirstRoute(adminConfig)
      }
      return x;
    }
  )
  // configFirstRoute = this.accountService.getFirstRoute(adminConfig);
  // officeFirstRoute = this.accountService.getFirstRoute(adminOffices);
  //isTest = environment.test;
  constructor(private accountService: AccountService,
              private router: Router,
              private languageService: LanguageService,
              private confirm: ConfirmService) { }

  ngOnInit(): void {
    this.language$.subscribe(x => this.language = x)
  }

  logOut() {
    this.confirm.open({Type: 'logout'}).pipe(
      filter(x => x)
    ).subscribe(() => {
      this.accountService.logOut();
      this.router.navigateByUrl('/');
    })
  }
  changeLanguage(lang: string) {
    if(lang === this.language) {
      return;
    }
    this.languageService.changeLangageRefresh(lang);

  }

}
