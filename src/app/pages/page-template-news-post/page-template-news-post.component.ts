import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { Post } from 'src/app/app-models/site-content';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';
import { SiteService } from 'src/app/app-services/site.service';

@Component({
  selector: 'app-page-template-news-post',
  templateUrl: './page-template-news-post.component.html',
  styleUrls: ['./page-template-news-post.component.scss']
})
export class PageTemplateNewsPostComponent implements OnInit {
  post$!: Observable<Post>;
  language$ = this.languageService.currentLanguage$;
  isHandset = this.deviceService.isHandset$;
  constructor(private route: ActivatedRoute,
              private siteService: SiteService,
              private languageService: LanguageService,
              private deviceService: DeviceService) { }
  ngOnInit(): void {
    this.post$ = this.route.paramMap.pipe(
      map((paramMap: ParamMap) => {
        if(paramMap.get('id')) {
          return +paramMap.get('id')!
        }
        else {
          return 0;
        }
      }),
      switchMap(id => this.siteService.getPostById(id))
    )
  }


}
