import { Component, OnInit } from '@angular/core';
import { adminConfig } from 'src/app/app-models/routes-urls';
import { AccountService } from 'src/app/app-services/account.service';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';

@Component({
  selector: 'app-admin-config-nav',
  templateUrl: './admin-config-nav.component.html',
  styleUrls: ['./admin-config-nav.component.scss']
})
export class AdminConfigNavComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  dir = this.languageService.currentDirection$;
  routes = this.accountService.getRouteConfig(adminConfig);
  constructor(private deviceService: DeviceService,
              private languageService: LanguageService,
              private accountService: AccountService) { }

  ngOnInit(): void {
  }

}
