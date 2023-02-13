import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { toDoc } from 'ngx-editor';
import { BehaviorSubject, concatMap, finalize, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getLocaleDate } from '../app-helpers/date-helper';
import { Office } from '../app-models/office';
import { DynamicTableByndingModel, DynamicTableResult } from '../app-models/shared';
import { GuestMessage, Page, Post, Section } from '../app-models/site-content';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  private url = environment.apiUrl + 'site/';
  private isLoadingOffices = new BehaviorSubject<boolean>(false);
  private isLoadingPage = new BehaviorSubject<boolean>(false);
  private isLoadingPost = new BehaviorSubject<boolean>(false);
  private isLoadingNews = new BehaviorSubject<boolean>(false);
  private isOrdering = new BehaviorSubject<boolean>(false);
  private isSendingContactUs = new BehaviorSubject<boolean>(false);
  private guestMessagesSize = new BehaviorSubject<number>(0)
  constructor(private http: HttpClient) { }

  createNoPhotoForm(model: Page | null | undefined): FormGroup {
    const frm = new FormGroup({
      Id: new FormControl(model?.Id, Validators.required),
      TitleEnglish: new FormControl(model?.TitleEnglish, [Validators.required, Validators.minLength(4)]),
      TitleArabic: new FormControl(model?.TitleArabic, [Validators.required, Validators.minLength(4)]),
      SubtitleEnglish: new FormControl(model?.SubtitleEnglish),
      SubtitleArabic: new FormControl(model?.SubtitleArabic),
      BodyEnglish: new FormControl(model? model.BodyEnglish : ''),
      BodyArabic: new FormControl(model? model.BodyArabic : ''),
      IsPublished: new FormControl(model ? model.IsPublished : false, Validators.required),
      PublishDate: new FormControl(getLocaleDate(model?.PublishDate))
    });
    return frm;
  }

  createWithPhotoForm(model: Page | null | undefined): FormGroup {
    const frm = new FormGroup({
      Id: new FormControl(model?.Id, Validators.required),
      TitleEnglish: new FormControl(model?.TitleEnglish, [Validators.required, Validators.minLength(4)]),
      TitleArabic: new FormControl(model?.TitleArabic, [Validators.required, Validators.minLength(4)]),
      SubtitleEnglish: new FormControl(model?.SubtitleEnglish),
      SubtitleArabic: new FormControl(model?.SubtitleArabic),
      BodyEnglish: new FormControl(model? model.BodyEnglish : ''),
      BodyArabic: new FormControl(model? model.BodyArabic : ''),
      IsPublished: new FormControl(model ? model.IsPublished : false, Validators.required),
      PublishDate: new FormControl(getLocaleDate(model?.PublishDate)),
      ImageFile: new FormControl('')
    });
    return frm;
  }
  createPostForm(model?: Post, pageId?:number): FormGroup {
    const frm = new FormGroup({
      Id: new FormControl(model? model.Id : 0, Validators.required),
      PageId: new FormControl(model? model.PageId : pageId, Validators.required),
      TitleEnglish: new FormControl(model?.TitleEnglish, [Validators.required, Validators.minLength(4)]),
      TitleArabic: new FormControl(model?.TitleArabic, [Validators.required, Validators.minLength(4)]),
      SubtitleEnglish: new FormControl(model?.SubtitleEnglish),
      SubtitleArabic: new FormControl(model?.SubtitleArabic),
      BodyEnglish: new FormControl(model? model.BodyEnglish : ''),
      BodyArabic: new FormControl(model? model.BodyArabic : ''),
      IsPublished: new FormControl(model ? model.IsPublished : false, Validators.required),
      PublishDate: new FormControl(getLocaleDate(model?.PublishDate)),
      ImageFile: new FormControl(''),
      CategoryId: new FormControl(model?.CategoryId)
    });
    return frm;
  }
  createSectionForm(postId?:number): FormGroup {
    const frm = new FormGroup({
      Id: new FormControl(0, Validators.required),
      PostId: new FormControl(postId, Validators.required),
      TitleEnglish: new FormControl('', [Validators.required, Validators.minLength(4)]),
      TitleArabic: new FormControl('', [Validators.required, Validators.minLength(4)]),
      SubtitleEnglish: new FormControl(),
      SubtitleArabic: new FormControl(),
      IsPublished: new FormControl(true, Validators.required),
      PublishDate: new FormControl(),
      ImageFile: new FormControl('', Validators.required)
    });
    return frm;
  }

  getOfficesByFilter(filter: DynamicTableByndingModel): Observable<DynamicTableResult> {
    this.isLoadingOffices.next(true);
    return this.http.post<DynamicTableResult>(this.url + 'offices', filter).pipe(
      finalize(() => this.isLoadingOffices.next(false))
    )
  }
  getOfficeById(id: number): Observable<Office> {
    this.isLoadingOffices.next(true);
    return this.http.get<Office>(this.url + 'office/' + id).pipe(
      finalize(() => this.isLoadingOffices.next(false))
    )
  }

  getPageByUrl(url: string, onlyPublished?: boolean): Observable<Page> {
    this.isLoadingPage.next(true);
    return this.http.get<Page>(this.url + 'pages/' + url).pipe(
      map(x => {
        if(onlyPublished) {
          x.Posts = x.Posts.filter(x => x.IsPublished)
          return x
        } else {
          return x
        }
      }),
      finalize(() => this.isLoadingPage.next(false))
    );
  }

  editPage(id: number, model: Page): Observable<Page> {
    this.isLoadingPage.next(true);
    return this.http.put<Page>(this.url + 'pages/' + id, model).pipe(
      finalize(() => this.isLoadingPage.next(false))
    );
  }
  editPageWithPhoto(id: number, model: Page): Observable<Page> {
    this.isLoadingPage.next(true);
    return this.http.put<Page>(this.url + 'pages/' + id, model).pipe(
      concatMap(x => {
        if(x && model.ImageFile) {
          return this.uploadPageImage(x, model.ImageFile)
        }
        else {
          return of(x);
        }
      }),
      finalize(() => this.isLoadingPage.next(false))
    );
  }
  uploadPageImage(page: Page, file: File): Observable<Page> {
    const formData = new FormData();
    formData.append("Image", file);
    formData.append("Id", page.Id ? page.Id.toString() : '');
    return this.http.post<{ImageUrl: string}>(this.url + 'pages/upload-image', formData).pipe(
      map(x => {
        page.ImageUrl = x.ImageUrl;
        return page;
      })
    );
  }

  getPostById(id: number): Observable<Post> {
    this.isLoadingPost.next(true);
    return this.http.get<Post>(this.url + 'posts/' + id).pipe(
      finalize(() => this.isLoadingPost.next(false))
    );
  }

  addPostWithImage(model: Post): Observable<Post> {
    this.isLoadingPost.next(true);
    return this.http.post<Post>(this.url + 'posts', model).pipe(
      concatMap(x => {
        if(x && model.ImageFile) {
          return this.uploadPostImage(x, model.ImageFile)
        }
        else {
          return of(x);
        }
      }),
      finalize(() => this.isLoadingPost.next(false))
    )
  }
  addPostWithTitleOnly(model: {PageId: number, TitleEnglish: string}): Observable<Post> {
    this.isLoadingPage.next(true);
    return this.http.post<Post>(this.url + 'post-title', model).pipe(
      finalize(() => this.isLoadingPage.next(false))
    )
  }

  addSectionWithImage(model: Section): Observable<Section> {
    this.isLoadingPost.next(true);
    return this.http.post<Section>(this.url + 'sections', model).pipe(
      concatMap(x => {
        if(x && model.ImageFile) {
          return this.uploadSectionImage(x, model.ImageFile)
        }
        else {
          return of(x);
        }
      }),
      finalize(() => this.isLoadingPost.next(false))
    )
  }

  changePostOrder(pageId: number, previousIndex: number, currentIndex: number): Observable<boolean> {
    this.isLoadingPage.next(true);
    return this.http.get<boolean>(this.url + `posts/reorder-post?pageId=${pageId}&previousIndex=${previousIndex}&currentIndex=${currentIndex}`).pipe(
      finalize(() => this.isLoadingPage.next(false))
    )
  }
  changeSectionOrder(pageId: number, previousIndex: number, currentIndex: number): Observable<boolean> {
    this.isLoadingPost.next(true);
    return this.http.get<boolean>(this.url + `sections/reorder-section?postId=${pageId}&previousIndex=${previousIndex}&currentIndex=${currentIndex}`).pipe(
      finalize(() => this.isLoadingPost.next(false))
    )
  }
  deletePost(id: number): Observable<any> {
    this.isLoadingPage.next(true);
    return this.http.delete<any>(this.url + 'posts/' + id).pipe(
      finalize(() => this.isLoadingPage.next(false))
    )
  }
  deleteSection(id: number): Observable<any> {
    this.isLoadingPost.next(true);
    return this.http.delete<any>(this.url + 'sections/' + id).pipe(
      finalize(() => this.isLoadingPost.next(false))
    )
  }
  editPostWithPhoto(id: number, model: Post): Observable<Post> {
    this.isLoadingPost.next(true);
    return this.http.put<Post>(this.url + 'posts/' + id, model).pipe(
      concatMap(x => {
        if(x && model.ImageFile) {
          return this.uploadPostImage(x, model.ImageFile)
        }
        else {
          return of(x);
        }
      }),
      finalize(() => this.isLoadingPost.next(false))
    );
  }
  uploadPostImage(post: Post, file: File): Observable<Post> {
    const formData = new FormData();
    formData.append("Image", file);
    formData.append("Id", post.Id ? post.Id.toString() : '');
    return this.http.post<{ImageUrl: string}>(this.url + 'posts/upload-image', formData).pipe(
      map(x => {
        post.ImageUrl = x.ImageUrl;
        return post;
      })
    );
  }
  uploadSectionImage(section: Section, file: File): Observable<Section> {
    const formData = new FormData();
    formData.append("Image", file);
    formData.append("Id", section.Id ? section.Id.toString() : '');
    return this.http.post<{ImageUrl: string}>(this.url + 'sections/upload-image', formData).pipe(
      map(x => {
        section.ImageUrl = x.ImageUrl;
        return section;
      })
    );
  }
  addSectionWithImageFormData(model: Section): Observable<Section> {
    this.isLoadingPost.next(true);
    const formData = new FormData();
    formData.append("PostId", model.PostId.toString());
    formData.append("TitleArabic", model.TitleArabic);
    formData.append("TitleEnglish", model.TitleEnglish);
    formData.append("Image", model.ImageFile);
    return this.http.post<Section>(this.url + 'sections-with-image', formData).pipe(
      finalize(() => this.isLoadingPost.next(false))
    )
  }
  getLastNews(): Observable<Post[]> {
    this.isLoadingNews.next(true)
    return this.http.get<{Data: Post[], DataSize: number}>(this.url + 'last-news').pipe(
      map(x => x.Data),
      finalize(() => this.isLoadingNews.next(false))
    )
  }
  contactUsSend(model: any): Observable<any> {
    this.isSendingContactUs.next(true);
    return this.http.post(this.url + 'messages' ,model).pipe(
      finalize(() => this.isSendingContactUs.next(false))
    )
  }
  getContactUsMessages(filter: DynamicTableByndingModel): Observable<GuestMessage[]> {
    this.isSendingContactUs.next(true);
    return this.http.post<DynamicTableResult>(this.url + 'messages/filter' ,filter).pipe(
      tap(x => this.guestMessagesSize.next(x.DataSize)),
      map(x => x.Data),
      finalize(() => this.isSendingContactUs.next(false))
    )
  }
  readContactUsMessage(id: number): Observable<GuestMessage> {
    this.isSendingContactUs.next(true);
    return this.http.get<GuestMessage>(this.url + 'messages/read/' + id).pipe(
      finalize(() => this.isSendingContactUs.next(false))
    )
  }
  unreadContactUsMessage(id: number): Observable<GuestMessage> {
    this.isSendingContactUs.next(true);
    return this.http.get<GuestMessage>(this.url + 'messages/unread/' + id).pipe(
      finalize(() => this.isSendingContactUs.next(false))
    )
  }

  get isLoadingOffices$(): Observable<boolean> {
    return this.isLoadingOffices.asObservable();
  }

  get isLoadingPage$(): Observable<boolean> {
    return this.isLoadingPage.asObservable();
  }

  get isLoadingPost$(): Observable<boolean> {
    return this.isLoadingPost.asObservable();
  }

  get isOrdering$(): Observable<boolean> {
    return this.isOrdering.asObservable();
  }

  get isLoadingNews$(): Observable<boolean> {
    return this.isLoadingNews.asObservable();
  }
  get isSendingContactUs$(): Observable<boolean> {
    return this.isSendingContactUs.asObservable();
  }
  get guestMessagesSize$(): Observable<number> {
    return this.guestMessagesSize.asObservable();
  }

}
