import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-dictionaries-nav',
  templateUrl: './admin-dictionaries-nav.component.html',
  styleUrls: ['./admin-dictionaries-nav.component.scss']
})
export class AdminDictionariesNavComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  isTest = environment.test;
  dir = this.languageService.currentDirection$;
  constructor(private deviceService: DeviceService,
              private languageService: LanguageService) { }

  ngOnInit(): void {
  }

}
