import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { imagesUrlMap, Page, Post } from 'src/app/app-models/site-content';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';
import { SiteService } from 'src/app/app-services/site.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  language$ = this.languageService.currentLanguage$;
  page!: Page;
  imageUrlEnglish: string | undefined;
  imageUrlArabic: string | undefined;
  isLoading = this.siteService.isLoadingPage$;
  nowDate = Date.now();
  constructor(private deviceService: DeviceService,
              private languageService: LanguageService,
              private route: ActivatedRoute,
              private siteService: SiteService,
              private router: Router) { }

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
  goToAlbum(post: Post) {
    this.router.navigate([post.Id], {relativeTo: this.route});
  }

}
