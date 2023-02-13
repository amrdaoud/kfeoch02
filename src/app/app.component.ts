
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import LanguageService from './app-services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private languageService: LanguageService,
              private titleService: Title,){}

  title = 'Federation of Kuwaiti Engineering Offices';
  ngOnInit():void {
    this.languageService.currentLanguage$.subscribe(x => {
      if(x === 'ar') {
        this.titleService.setTitle('اتحاد المكاتب الهندسية و الدور الاستشارية')
      } else {
        this.titleService.setTitle('Federation of Kuwaiti Engineering Offices');
      }
    });
  }
}
