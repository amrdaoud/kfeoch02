import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-office-members-nav',
  templateUrl: './office-members-nav.component.html',
  styleUrls: ['./office-members-nav.component.scss']
})
export class OfficeMembersNavComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  isTest = environment.test;
  dir = this.languageService.currentDirection$;
  constructor(private deviceService: DeviceService,
              private languageService: LanguageService) { }

  ngOnInit(): void {
  }

}
