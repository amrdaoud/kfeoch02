import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor } from 'ngx-editor';
import { map, switchMap, tap, filter, exhaustMap, catchError } from 'rxjs';
import { toolbar } from 'src/app/app-models/shared';
import { Page, Post } from 'src/app/app-models/site-content';
import { ConfirmService } from 'src/app/app-services/confirm.service';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';
import { SiteService } from 'src/app/app-services/site.service';

@Component({
  selector: 'app-admin-site-content-with-posts',
  templateUrl: './admin-site-content-with-posts.component.html',
  styleUrls: ['./admin-site-content-with-posts.component.scss']
})
export class AdminSiteContentWithPostsComponent implements OnInit {
  frm!: FormGroup;
  isHandset = this.deviceService.isHandset$;
  page!: Page;
  englishEditor!: Editor;
  arabicEditor!: Editor;
  isLoading = this.siteService.isLoadingPage$;
  toolbar = toolbar;
  dataSource = new MatTableDataSource<Post>();
  language$ = this.languageService.currentLanguage$;
  displayedColumns: string[] = [];
  nowDate = Date.now();
  constructor(private deviceService: DeviceService,
              private route: ActivatedRoute,
              private siteService: SiteService,
              private confirm: ConfirmService,
              private languageService: LanguageService,
              private router: Router) { }

  ngOnInit(): void {
    this.englishEditor = new Editor();
    this.arabicEditor = new Editor();
    this.deviceService.isHandset$.subscribe(x => {
      if(x) {
        this.displayedColumns = ['Title', 'Subtitle', 'actions']
      } else {
        this.displayedColumns = ['Image','Title', 'Subtitle', 'actions']
      }
    })
    this.route.url.pipe(
      map(x => x[0].path),
      switchMap(url => this.siteService.getPageByUrl(url)),
      tap(page => {
        this.page = page;
        this.dataSource.data = this.page.Posts;
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

  onListDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.dataSource.data, event.previousIndex, event.currentIndex);
    this.dataSource.data =[...this.dataSource.data];
    this.siteService.changePostOrder(this.page.Id,event.previousIndex, event.currentIndex)
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
  goToPost(post: Post) {
    this.router.navigate(['posts',this.page.Id,post.Id], {relativeTo: this.route})
  }
  delete(post: Post, i: number) {
    this.confirm.open({Type: 'delete'}).pipe(
      filter(x => x),
      exhaustMap(() => this.siteService.deletePost(post.Id))
    )
    .subscribe(x => {
      this.dataSource.data.splice(i,1);
      this.dataSource.data = [...this.dataSource.data];
    });
  }
  addNewPost() {
    this.router.navigate(['posts',this.page.Id], {relativeTo: this.route});
  }
  uncacheImage(imageUrl: string): string {
    return imageUrl + '?r=' + Date.now()
  }
  ngOnDestroy(): void {
    this.englishEditor.destroy();
    this.arabicEditor.destroy();
  }

}
