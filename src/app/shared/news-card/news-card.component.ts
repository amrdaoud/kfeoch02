import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {
@Input() newsDate: Date = new Date();
@Input() newsCategory: string | null | undefined = 'Category';
@Input() newsHeadline = 'Post 1 Headline';
@Input() newsText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida, nibh eget pharetra pulvinar, nulla nibh porttitor nulla, in vulputate lacus mauris eget ex. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras faucibus, ante id pellentesque auctor, est nisi sodales mauris, sed interdum justo.';
@Input() newsImgUrl = 'assets/images/Slider/carousel-1.jpg';
@Input() isHandset = of(false);
@Output() readMore = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }
  onClick() {
    this.readMore.emit(true);
  }

}
