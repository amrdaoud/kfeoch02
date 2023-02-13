import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/app-services/account.service';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-office-home',
  templateUrl: './office-home.component.html',
  styleUrls: ['./office-home.component.scss']
})
export class OfficeHomeComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  isTest = environment.test;
  dir = this.languageService.currentDirection$;
  isAdmin = this.accountService.inRoles(['Administrator']);
  constructor(private deviceService: DeviceService,
              private languageService: LanguageService,
              private accountService: AccountService) { }

  ngOnInit(): void {
  }

}
