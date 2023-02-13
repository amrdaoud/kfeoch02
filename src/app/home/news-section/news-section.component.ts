import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/app-models/site-content';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';
import { SiteService } from 'src/app/app-services/site.service';

@Component({
  selector: 'app-news-section',
  templateUrl: './news-section.component.html',
  styleUrls: ['./news-section.component.scss']
})
export class NewsSectionComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  d = new Date();
  news = this.siteService.getLastNews();
  language$ = this.languageService.currentLanguage$;
  constructor(private deviceService: DeviceService,
              private siteService: SiteService,
              private languageService: LanguageService,
              private router: Router) { }

  ngOnInit(): void {
  }
  goToPost(post: Post) {
    this.router.navigateByUrl('/pages/news/' + post.Id);
  }

}
