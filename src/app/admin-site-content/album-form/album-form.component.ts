import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Editor } from 'ngx-editor';
import { filter, tap, map, switchMap, of, exhaustMap, catchError } from 'rxjs';
import { Post, Section } from 'src/app/app-models/site-content';
import { ConfirmService } from 'src/app/app-services/confirm.service';
import { DeviceService } from 'src/app/app-services/device.service';
import { DictionaryService } from 'src/app/app-services/dictionary.service';
import LanguageService from 'src/app/app-services/language.service';
import { SiteService } from 'src/app/app-services/site.service';

@Component({
  selector: 'app-album-form',
  templateUrl: './album-form.component.html',
  styleUrls: ['./album-form.component.scss']
})
export class AlbumFormComponent implements OnInit {
  frm!: FormGroup;
  isHandset = this.deviceService.isHandset$;
  post!: Post;
  isLoading = this.siteService.isLoadingPost$;
  toolbar= toolbar;
  imgSrc!: string | ArrayBuffer | null;
  postId = 0;
  pageId = 0;
  categories = this.dictionaryService.postCategories;
  categoriesLoading = this.dictionaryService.postCategoriesLoading;
  language$ = this.languageService.currentLanguage$;
  dataSource = new MatTableDataSource<Section>();
  nowDate = Date.now();
  displayedColumns: string[] = [];
  constructor(private deviceService: DeviceService,
              private languageService: LanguageService,
              private route: ActivatedRoute,
              private siteService: SiteService,
              private confirm: ConfirmService,
              private router: Router,
              private dictionaryService: DictionaryService) { }

  ngOnInit(): void {
    this.deviceService.isHandset$.subscribe(x => {
      if(x) {
        this.displayedColumns = ['Title', 'Subtitle', 'actions']
      } else {
        this.displayedColumns = ['Image','Title', 'Subtitle', 'actions']
      }
    })
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
        if(this.post) {
          this.dataSource.data = this.post.Sections;
        }
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
        this.router.navigate([x.Id], {relativeTo: this.route});

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
  onListDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.dataSource.data, event.previousIndex, event.currentIndex);
    this.dataSource.data =[...this.dataSource.data];
    this.siteService.changeSectionOrder(this.post.Id,event.previousIndex, event.currentIndex)
    .pipe(
      filter(x => !x),
      tap(() => {
        moveItemInArray(this.dataSource.data, event.previousIndex, event.currentIndex);
        this.dataSource.data =[...this.dataSource.data];
      }),
      catchError(err => {
        moveItemInArray(this.dataSource.data, event.previousIndex, event.currentIndex);
        this.dataSource.data =[...this.dataSource.data];
        throw err;
      })
    )
    .subscribe()
  }
  // goToSection(section: Section) {
  //   this.router.navigate(['sections',this.post.Id,section.Id], {relativeTo: this.route})
  // }
  delete(section: Section, i: number) {
    this.confirm.open({Type: 'delete'}).pipe(
      filter(x => x),
      exhaustMap(() => this.siteService.deleteSection(section.Id))
    )
    .subscribe(x => {
      this.dataSource.data.splice(i,1);
      this.dataSource.data = [...this.dataSource.data];
    });
  }
  addNewSection() {
    this.router.navigate(['sections'], {relativeTo: this.route});
  }
  uncacheImage(imageUrl: string): string {
    return imageUrl + '?r=' + Date.now()
  }



}

