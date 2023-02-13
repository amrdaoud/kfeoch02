import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Office } from 'src/app/app-models/office';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';
import { SiteService } from 'src/app/app-services/site.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  language = this.languageService.currentLanguage$;
  offices: Office[] = [];
  val1 = 0;
  val2 = 0;
  val3 = 0
  isLoadingOffices = this.siteService.isLoadingOffices$;
  constructor(private deviceService: DeviceService,
              private languageService: LanguageService,
              private siteService: SiteService) { }

  ngOnInit(): void {
    this.siteService.getOfficesByFilter({Order: 'asc', Sort: 'Id', PageIndex: 0, PageSize: 500, SearchQuery: ''}).pipe(
      map(x => x.Data)
    )
    .subscribe(x => {
      this.offices = x;
      this.val1 = x.filter(o => o.TypeEnglish === 'Local Offices').length;
      this.val2 = x.filter(o => o.TypeEnglish === 'Foreign Offices').length;
      this.val3 = x.filter(o => o.TypeEnglish === 'Specialized Offices').length;
    });
  }

}
