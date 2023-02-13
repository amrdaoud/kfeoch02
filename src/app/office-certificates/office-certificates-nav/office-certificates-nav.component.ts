import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';

@Component({
  selector: 'app-office-certificates-nav',
  templateUrl: './office-certificates-nav.component.html',
  styleUrls: ['./office-certificates-nav.component.scss']
})
export class OfficeCertificatesNavComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  dir = this.languageService.currentDirection$;
  constructor(private deviceService: DeviceService,
              private languageService: LanguageService) { }

  ngOnInit(): void {
  }

}
