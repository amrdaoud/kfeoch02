import { Component, Input, OnInit } from '@angular/core';
import { Page } from 'src/app/app-models/site-content';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';

@Component({
  selector: 'app-page-template-with-photo',
  templateUrl: './page-template-with-photo.component.html',
  styleUrls: ['./page-template-with-photo.component.scss']
})
export class PageTemplateWithPhotoComponent implements OnInit {
  @Input() page!: Page;
  nowDate = Date.now();
  language$ = this.languageService.currentLanguage$;
  isHandset = this.deviceService.isHandset$;
  constructor(private languageService: LanguageService,
              private deviceService: DeviceService) { }
  ngOnInit(): void {
  }

}
