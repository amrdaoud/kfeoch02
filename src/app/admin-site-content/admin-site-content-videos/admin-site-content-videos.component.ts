import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor } from 'ngx-editor';
import { map, switchMap, tap, filter, exhaustMap, catchError } from 'rxjs';
import { Page, Post } from 'src/app/app-models/site-content';
import { ConfirmService } from 'src/app/app-services/confirm.service';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';
import { SiteService } from 'src/app/app-services/site.service';

@Component({
  selector: 'app-admin-site-content-videos',
  templateUrl: './admin-site-content-videos.component.html',
  styleUrls: ['./admin-site-content-videos.component.scss']
})
export class AdminSiteContentVideosComponent implements OnInit {
  frm!: FormGroup;
  isHandset = this.deviceService.isHandset$;
  page!: Page;
  isLoading = this.siteService.isLoadingPage$;
  toolbar = toolbar;
  dataSource = new MatTableDataSource<Post>();
  language$ = this.languageService.currentLanguage$;
  displayedColumns: string[] = ['Url', 'actions']
  nowDate = Date.now();
  addFrm = new FormGroup({
    PageId: new FormControl<number>(0, Validators.required),
    TitleEnglish: new FormControl('', Validators.required)
  });
  constructor(private deviceService: DeviceService,
              private route: ActivatedRoute,
              private siteService: SiteService,
              private confirm: ConfirmService,
              private languageService: LanguageService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.url.pipe(
      map(x => x[0].path),
      switchMap(url => this.siteService.getPageByUrl(url)),
      tap(page => {
        this.page = page;
        this.addFrm.get('PageId')?.setValue(page.Id);
        this.dataSource.data = this.page.Posts;
        this.frm = this.siteService.createNoPhotoForm(page)
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
        return this.siteService.editPage(this.page?.Id,this.frm.value)
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
      this.frm.patchValue(this.page);
    })
  }

  onListDrop(event: CdkDragDrop<string[]>) {
    if(event.previousIndex === event.currentIndex) {
      return;
    }
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
    if(this.addFrm.invalid) {
      return;
    }
    this.confirm.open({Type: 'add'}).pipe(
      filter(x => x),
      exhaustMap(() => {
        return this.siteService.addPostWithTitleOnly(this.addFrm.value as {PageId: number, TitleEnglish: string})
      })
    ).subscribe(newPost => {
      this.dataSource.data.push(newPost);
      this.dataSource.data = [...this.dataSource.data];
      this.addFrm.reset();
    })
  }
  uncacheImage(imageUrl: string): string {
    return imageUrl + '?r=' + Date.now()
  }

}
