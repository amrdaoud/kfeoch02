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
  constructor(private translateService: TranslateService, @Inject(DOCUMENT) private document: Document){
    this.changeLangage(this.currentLanguage);
  }
  changeLangage(lang: string) {
    let htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
    htmlTag.dir = lang === "ar" ? "rtl" : "ltr";
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
    this.changeCssFile(lang);
    this.currentLanguage = lang;
    this.currentLanguageSubject.next(lang);
    // window.location.reload();
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

}
