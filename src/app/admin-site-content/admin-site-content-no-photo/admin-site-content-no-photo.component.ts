import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Editor, toHTML, Toolbar } from 'ngx-editor';
import { schema } from 'ngx-editor/schema';
import { exhaustMap, filter, map, switchMap, tap } from 'rxjs';
import { toolbar } from 'src/app/app-models/shared';
import { Page } from 'src/app/app-models/site-content';
import { ConfirmService } from 'src/app/app-services/confirm.service';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';
import { SiteService } from 'src/app/app-services/site.service';

@Component({
  selector: 'app-admin-site-content-no-photo',
  templateUrl: './admin-site-content-no-photo.component.html',
  styleUrls: ['./admin-site-content-no-photo.component.scss']
})
export class AdminSiteContentNoPhotoComponent implements OnInit, OnDestroy {
  frm!: FormGroup;
  isHandset = this.deviceService.isHandset$;
  page!: Page;
  englishEditor!: Editor;
  arabicEditor!: Editor;
  isLoading = this.siteService.isLoadingPage$;
  toolbar=toolbar;
  language$ = this.languageService.currentLanguage$;
  constructor(private deviceService: DeviceService,
              private languageService: LanguageService,
              private route: ActivatedRoute,
              private siteService: SiteService,
              private confirm: ConfirmService) { }

  ngOnInit(): void {
    this.englishEditor = new Editor();
    this.arabicEditor = new Editor();
    this.route.url.pipe(
      map(x => x[0].path),
      switchMap(url => this.siteService.getPageByUrl(url)),
      tap(page => {
        this.page = page;
        this.frm = this.siteService.createNoPhotoForm(page)
      })
    ).subscribe();
  }
  save() {
    if(this.frm.invalid) {
      return;
    }
    // this.frm.get('BodyEnglish')?.setValue(toHTML(this.frm.get('BodyEnglish')?.value))
    // this.frm.get('BodyArabic')?.setValue(toHTML(this.frm.get('BodyArabic')?.value))
    this.confirm.open({Type: 'update'}).pipe(
      filter(x => x),
      exhaustMap(() => {
        return this.siteService.editPage(this.page?.Id,this.frm.value)
      })
    )
    .subscribe(x => {
      this.page = x;
      // this.frm = this.siteService.createNoPhotoForm(this.page);
    });
  }
  reset() {
    this.confirm.open({Type: 'reset'}).pipe(
      filter(x => x)
    ).subscribe(() => {
      this.frm.patchValue(this.page);
    })
  }
  ngOnDestroy(): void {
    this.englishEditor.destroy();
    this.arabicEditor.destroy();
  }

}
