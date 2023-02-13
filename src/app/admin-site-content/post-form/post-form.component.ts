import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Editor } from 'ngx-editor';
import { exhaustMap, filter, map, of, switchMap, tap } from 'rxjs';
import { toolbar } from 'src/app/app-models/shared';
import { Post } from 'src/app/app-models/site-content';
import { ConfirmService } from 'src/app/app-services/confirm.service';
import { DeviceService } from 'src/app/app-services/device.service';
import { DictionaryService } from 'src/app/app-services/dictionary.service';
import LanguageService from 'src/app/app-services/language.service';
import { SiteService } from 'src/app/app-services/site.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  frm!: FormGroup;
  isHandset = this.deviceService.isHandset$;
  post!: Post;
  englishEditor!: Editor;
  arabicEditor!: Editor;
  isLoading = this.siteService.isLoadingPost$;
  toolbar= toolbar;
  imgSrc!: string | ArrayBuffer | null;
  postId = 0;
  pageId = 0;
  categories = this.dictionaryService.postCategories;
  categoriesLoading = this.dictionaryService.postCategoriesLoading;
  language$ = this.languageService.currentLanguage$;
  constructor(private deviceService: DeviceService,
              private languageService: LanguageService,
              private route: ActivatedRoute,
              private siteService: SiteService,
              private confirm: ConfirmService,
              private router: Router,
              private dictionaryService: DictionaryService) { }

  ngOnInit(): void {
    this.englishEditor = new Editor();
    this.arabicEditor = new Editor();
    this.route.paramMap.pipe(
      filter((param: ParamMap) => param.get('pageId') ? true : false),
      tap((param: ParamMap) => this.pageId = +param.get('pageId')!),
      map((param: ParamMap) => {
        if(param.get('id')) {
          this.postId = +param.get('id')!;
          return this.postId;
        } else {
          return null;
        }
      }),
      switchMap((id: number | null) => {
        if(id) {
          return this.siteService.getPostById(id)
        } else {
          return of(null)
        }
      }),
      tap(post => {
        this.post = post!;
        if(this.post?.ImageUrl) {
          this.imgSrc = this.post.ImageUrl + '?r=' + Date.now();
        }
        this.frm = this.siteService.createPostForm(post!,this.pageId);
      })
    ).subscribe();
  }
  save() {
    if(this.frm.invalid) {
      return;
    }
    const currentUrl = this.route.snapshot.url;
    if(this.postId) {
      this.confirm.open({Type: 'update'}).pipe(
        filter(x => x),
        exhaustMap(() => {
          return this.siteService.editPostWithPhoto(this.post?.Id,this.frm.value)
        })
      )
      .subscribe(x => {
        this.post = x;

        this.router.navigate(['./' + currentUrl[0]], {relativeTo: this.route.parent});
      });
    } else {
      this.confirm.open({Type: 'add'}).pipe(
        filter(x => x),
        exhaustMap(() => {
          return this.siteService.addPostWithImage(this.frm.value)
        })
      )
      .subscribe(x => {
        this.frm = this.siteService.createPostForm(this.post!, this.pageId);
        this.router.navigate(['./' + currentUrl[0]], {relativeTo: this.route.parent});
      });
    }

  }

  reset() {
    this.confirm.open({Type: 'reset'}).pipe(
      filter(x => x)
    ).subscribe(() => {
      if(this.post.ImageUrl) {
        this.imgSrc = this.post.ImageUrl + '?r=' + Date.now();
      }
      this.frm.patchValue(this.post);
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
