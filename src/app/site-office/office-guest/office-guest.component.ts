import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, map, Observable, switchMap } from 'rxjs';
import { Office } from 'src/app/app-models/office';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';
import { SiteService } from 'src/app/app-services/site.service';

@Component({
  selector: 'app-office-guest',
  templateUrl: './office-guest.component.html',
  styleUrls: ['./office-guest.component.scss']
})
export class OfficeGuestComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  office!: Observable<Office>;
  language$ = this.languageService.currentLanguage$;
  constructor(private deviceService: DeviceService,
              private route: ActivatedRoute,
              private siteService: SiteService,
              private languageService: LanguageService) { }

  ngOnInit(): void {
    this.office = this.route.paramMap.pipe(
      map((paramMap: ParamMap) => +paramMap.get('id')!),
      filter(id => id !== null),
      switchMap((id: number) => this.siteService.getOfficeById(id))
    )
  }

}
