import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BehaviorSubject, Observable } from 'rxjs';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@Injectable({
  providedIn: 'root'
})
export default class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>(this.currentLanguage);
  private currentDirectionSubject = new BehaviorSubject<string>(this.currentLanguage === 'ar' ? 'rtl' : 'ltr')
  constructor(private translateService: TranslateService, @Inject(DOCUMENT) private document: Document){
    this.changeLanguage(this.currentLanguage);
  }
  changeLangageRefresh(lang: string) {
    this.changeLanguage(lang);
    //window.location.reload();
 }
 private changeLanguage(lang: string) {
  let htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
  //let overlayTag = htmlTag.getElementsByClassName("cdk-overlay-container")[0] as HTMLElement;
  htmlTag.dir = lang === "ar" ? "rtl" : "ltr";
  //overlayTag.dir = lang === "ar" ? "rtl" : "ltr";
  this.currentDirectionSubject.next(htmlTag.dir);
  this.translateService.setDefaultLang(lang);
  this.translateService.use(lang);
  this.changeCssFile(lang);
  this.currentLanguage = lang;
  this.currentLanguageSubject.next(lang);
 }
 private changeCssFile(lang: string) {
  let headTag = this.document.getElementsByTagName("head")[0] as HTMLHeadElement;
  let existingLink = this.document.getElementById("langCss") as HTMLLinkElement;
  let bundleName = lang === "ar" ?       "arabicStyle.css":"englishStyle.css";
  if (existingLink) {
     existingLink.href = bundleName;
  } else {
     let newLink = this.document.createElement("link");
     newLink.rel = "stylesheet";
     newLink.type = "text/css";
     newLink.id = "langCss";
     newLink.href = bundleName;
     headTag.appendChild(newLink);
  }
  }
  get currentLanguage(): string {
    const lang = localStorage.getItem('lang');
    if(!lang) {
      return 'en'
    }
    else {
      return lang;
    }
  }
  set currentLanguage(value: string) {
    localStorage.setItem('lang',value);
  }
  get currentLanguage$():Observable<string> {
    return this.currentLanguageSubject.asObservable();
  }
  get currentDirection$(): Observable<string> {
    return this.currentDirectionSubject.asObservable();
  }

}
