import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';

@Component({
  selector: 'app-admin-license-nav',
  templateUrl: './admin-license-nav.component.html',
  styleUrls: ['./admin-license-nav.component.scss']
})
export class AdminLicenseNavComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  dir = this.languageService.currentDirection$;
  constructor(private deviceService: DeviceService,
              private languageService: LanguageService) { }

  ngOnInit(): void {
  }

}
