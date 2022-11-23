import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSidenavContent } from '@angular/material/sidenav';
import {filter, fromEvent, map, Observable, take, takeUntil, tap } from 'rxjs';
import { DeviceService } from '../app-services/device.service';
import LanguageService from '../app-services/language.service';
import * as AOS from 'aos';
import { AccountService } from '../app-services/account.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements AfterViewInit {
  isHandset$ = this.deviceService.isHandset$;
  currentLanguage = this.languageService.currentLanguage$;
  memberName = this.accountService.getAuthName();
  officeId = this.accountService.getOfficeId();
  @ViewChild(MatSidenavContent) navContent!: MatSidenavContent;
  stretchMenu! : Observable<boolean>;

  constructor(private deviceService: DeviceService,
              private languageService: LanguageService,
              private accountService: AccountService) { }
  changeLanguage(lang: string) {
    this.languageService.changeLangage(lang);
    window.location.reload();
  }
  ngAfterViewInit(): void {
    AOS.init();
    this.stretchMenu = fromEvent(this.navContent.getElementRef().nativeElement,'scroll').pipe(
      map(() => {
        AOS.refresh();
        return this.navContent.getElementRef().nativeElement.scrollTop > 90
      })
    )
  }
openMenu(menuTrigger: MatMenuTrigger) {
  menuTrigger.openMenu();
}
closeMenu(menuTrigger: MatMenuTrigger) {
  menuTrigger.closeMenu();
}


}
