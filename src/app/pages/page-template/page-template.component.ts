import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { imagesUrlMap, Page } from 'src/app/app-models/site-content';
import { DeviceService } from 'src/app/app-services/device.service';
import { SiteService } from 'src/app/app-services/site.service';

@Component({
  selector: 'app-page-template',
  templateUrl: './page-template.component.html',
  styleUrls: ['./page-template.component.scss']
})
export class PageTemplateComponent implements OnInit {
  page!: Page;
  isHandset = this.deviceService.isHandset$;
  imageUrlEnglish: string | undefined;
  imageUrlArabic: string | undefined;
  isLoading = this.siteService.isLoadingPage$;
  constructor(private route: ActivatedRoute,
              private deviceService: DeviceService,
              private siteService: SiteService) { }

  ngOnInit(): void {
    this.route.url.pipe(
      map(x => x[0].path),
      tap(url => {
        this.imageUrlEnglish = imagesUrlMap.find(x => x.url === url)?.imageUrlEnglish;
        this.imageUrlEnglish = imagesUrlMap.find(x => x.url === url)?.imageUrlArabic;
      }),
      switchMap(url => this.siteService.getPageByUrl(url, true))
    ).subscribe(x => {
      this.page = x!;
    })
  }

}
