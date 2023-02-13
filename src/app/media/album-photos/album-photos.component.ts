import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import lgZoom from 'lightgallery/plugins/zoom';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { map, Observable, switchMap } from 'rxjs';
import { Post } from 'src/app/app-models/site-content';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SiteService } from 'src/app/app-services/site.service';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';
@Component({
  selector: 'app-album-photos',
  templateUrl: './album-photos.component.html',
  styleUrls: ['./album-photos.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlbumPhotosComponent implements OnInit {
  settings = {
    counter: false,
    selector: '.gallery-item',
    plugins: [lgZoom]
  };
  post!: Post;
  isLoading = this.siteService.isLoadingPost$;
  isHandset = this.deviceService.isHandset$;
  language$ = this.languageService.currentLanguage$;
  constructor(private route: ActivatedRoute,
              private siteService: SiteService,
              private deviceService: DeviceService,
              private languageService: LanguageService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((paramMap: ParamMap) => {
        if(paramMap.get('id')) {
          return +paramMap.get('id')!
        }
        else {
          return 0;
        }
      }),
      switchMap(id => this.siteService.getPostById(id))
    ).subscribe(x => this.post = x)
  }
  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };

}
