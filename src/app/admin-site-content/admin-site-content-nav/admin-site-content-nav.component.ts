import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';

@Component({
  selector: 'app-admin-site-content-nav',
  templateUrl: './admin-site-content-nav.component.html',
  styleUrls: ['./admin-site-content-nav.component.scss']
})
export class AdminSiteContentNavComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  dir = this.languageService.currentDirection$;
  constructor(private deviceService: DeviceService,
              private languageService: LanguageService) { }

  ngOnInit(): void {
  }

}
