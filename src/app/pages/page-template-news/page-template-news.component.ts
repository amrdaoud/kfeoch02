import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, startWith } from 'rxjs';
import { Page, Post } from 'src/app/app-models/site-content';
import { DeviceService } from 'src/app/app-services/device.service';
import { DictionaryService } from 'src/app/app-services/dictionary.service';
import LanguageService from 'src/app/app-services/language.service';

@Component({
  selector: 'app-page-template-news',
  templateUrl: './page-template-news.component.html',
  styleUrls: ['./page-template-news.component.scss']
})
export class PageTemplateNewsComponent implements OnInit {
  @Input() page!: Page;
  isHandset = this.deviceService.isHandset$;
  language$ = this.languageService.currentLanguage$;
  filteredPosts: Post[] = [];
  categories = this.dictionaryService.postCategories;
  frm = new FormGroup({
    SearchQuery: new FormControl(''),
    CategoryId: new FormControl('')
  })
  constructor(private deviceService: DeviceService,
              private languageService: LanguageService,
              private dictionaryService: DictionaryService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.filteredPosts = this.page.Posts;
    this.frm.valueChanges.pipe(
      debounceTime(600)
    )
    .subscribe(val => {
      const searchQuery = val['SearchQuery'];
      const categoryId = val['CategoryId'];
      if(!searchQuery && !categoryId) {
        this.filteredPosts = this.page.Posts;
      }
      if(categoryId) {
        this.filteredPosts = this.page.Posts.filter(x => x.CategoryId === +categoryId);
      }
      if(searchQuery) {
        this.filteredPosts = this.page.Posts.filter(
          x => x.TitleArabic.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
          x.TitleEnglish.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
          x.BodyArabic.toLowerCase().includes(searchQuery.toLowerCase()) ||
          x.BodyEnglish.toLowerCase().includes(searchQuery.toLowerCase()))
      }
    })
  }
  goToPost(post: Post) {
    this.router.navigate([post.Id],{relativeTo: this.route});
  }

}
