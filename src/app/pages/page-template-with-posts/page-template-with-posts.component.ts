import { Component, Input, OnInit } from '@angular/core';
import { Page } from 'src/app/app-models/site-content';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';

@Component({
  selector: 'app-page-template-with-posts',
  templateUrl: './page-template-with-posts.component.html',
  styleUrls: ['./page-template-with-posts.component.scss']
})
export class PageTemplateWithPostsComponent implements OnInit {
  @Input() page!: Page;
  isHandset = this.deviceService.isHandset$;
  language$ = this.languageService.currentLanguage$;
  constructor(private deviceService: DeviceService,
              private languageService: LanguageService) { }

  ngOnInit(): void {
  }

}
