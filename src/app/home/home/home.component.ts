import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  language = this.languageService.currentLanguage$;
  constructor(private deviceService: DeviceService,
              private languageService: LanguageService) { }

  ngOnInit(): void {
  }

}
