import { Component, OnInit } from '@angular/core';
import { adminOffices } from 'src/app/app-models/routes-urls';
import { AccountService } from 'src/app/app-services/account.service';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';

@Component({
  selector: 'app-admin-offices-nav',
  templateUrl: './admin-offices-nav.component.html',
  styleUrls: ['./admin-offices-nav.component.scss']
})
export class AdminOfficesNavComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  dir = this.languageService.currentDirection$;
  routes = this.accountService.getRouteConfig(adminOffices);
  constructor(private deviceService: DeviceService,
              private languageService: LanguageService,
              private accountService: AccountService) { }

  ngOnInit(): void {
  }

}
