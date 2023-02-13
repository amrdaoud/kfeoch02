import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Page } from 'src/app/app-models/site-content';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';

@Component({
  selector: 'app-page-template-no-photo',
  templateUrl: './page-template-no-photo.component.html',
  styleUrls: ['./page-template-no-photo.component.scss']
})
export class PageTemplateNoPhotoComponent implements OnInit {
  @Input() page!: Page;
  language$ = this.languageService.currentLanguage$;
  isHandset = this.deviceService.isHandset$;
  constructor(private deviceService: DeviceService,
              private languageService: LanguageService) {}

  ngOnInit(): void {
  }

}
