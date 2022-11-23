import { Component, OnInit } from '@angular/core';
import LanguageService from './app-services/language.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private languageService: LanguageService){}

  title = 'kfeoch02';
  ngOnInit():void {

  }
}
