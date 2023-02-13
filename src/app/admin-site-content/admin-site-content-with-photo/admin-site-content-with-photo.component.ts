import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Editor } from 'ngx-editor';
import { exhaustMap, filter, map, switchMap, tap } from 'rxjs';
import { toolbar } from 'src/app/app-models/shared';
import { Page } from 'src/app/app-models/site-content';
import { ConfirmService } from 'src/app/app-services/confirm.service';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';
import { SiteService } from 'src/app/app-services/site.service';

@Component({
  selector: 'app-admin-site-content-with-photo',
  templateUrl: './admin-site-content-with-photo.component.html',
  styleUrls: ['./admin-site-content-with-photo.component.scss']
})
export class AdminSiteContentWithPhotoComponent implements OnInit {
  frm!: FormGroup;
  isHandset = this.deviceService.isHandset$;
  page!: Page;
  englishEditor!: Editor;
  arabicEditor!: Editor;
  isLoading = this.siteService.isLoadingPage$;
  toolbar=toolbar;
  imgSrc!: string | ArrayBuffer | null;
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
        if(this.page.ImageUrl) {
          this.imgSrc = this.page.ImageUrl + '?r=' + Date.now();
        }
        this.frm = this.siteService.createWithPhotoForm(page)
      })
    ).subscribe();
  }
  save() {
    if(this.frm.invalid) {
      return;
    }
    this.confirm.open({Type: 'update'}).pipe(
      filter(x => x),
      exhaustMap(() => {
        return this.siteService.editPageWithPhoto(this.page?.Id,this.frm.value)
      })
    )
    .subscribe(x => {
      this.page = x;
    });
  }

  reset() {
    this.confirm.open({Type: 'reset'}).pipe(
      filter(x => x)
    ).subscribe(() => {
      if(this.page.ImageUrl) {
        this.imgSrc = this.page.ImageUrl + '?r=' + Date.now();
      }
      this.frm.patchValue(this.page);
    })
  }

  previewImage(event: any) {
    if(!event.target?.files || event.target?.files.length === 0) {
      return;
    }
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      this.imgSrc = reader.result!
    };
    reader.readAsDataURL(selectedFile);

    this.frm.get('ImageFile')?.setValue(selectedFile);
  }


}
