import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Page } from 'src/app/app-models/site-content';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';
import { SiteService } from 'src/app/app-services/site.service';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.scss']
})
export class TermsConditionComponent implements OnInit {
  isLoading = this.siteService.isLoadingPage$;
  language$ = this.languageService.currentLanguage$;
  isHandset = this.deviceService.isHandset$;
  constructor(@Inject(MAT_DIALOG_DATA) public page: Page,
              private siteService:SiteService,
              private deviceService: DeviceService,
              private languageService:LanguageService) { }

  ngOnInit(): void {}

}
