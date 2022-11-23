import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CarouselItem } from 'src/app/app-models/carousel';
const items: CarouselItem[] = [
  {
    ImageSrc:
    '/assets/images/Slider/carousel-1.jpg',
    ImageAlt: 'nature1',
    Title: 'Conditions for registering the office',
    SubTitle: 'For details please visit the registration conditions page',
    btnText: 'Read More'
  },
  {
    ImageSrc:
    '/assets/images/Slider/carousel-2.jpg',
      ImageAlt: 'nature2',
      Title: 'Connect with us',
      SubTitle: 'For details please visit the registration conditions page',
      btnText: 'Read More'
  },
  {
    ImageSrc:
    '/assets/images/Slider/carousel-3.jpg',
      ImageAlt: 'person1',
      Title: 'Board of Directors',
      SubTitle: 'For details please visit the registration conditions page',
      btnText: 'Read More'
  }
];

const arabicItems: CarouselItem[] = [
  {
    ImageSrc:
    '/assets/images/Slider/carousel-1.jpg',
    ImageAlt: 'nature1',
    Title: 'شروط تسجيل المكتب باتحاد المكاتب الهندسية',
    SubTitle: 'للاطلاع على التفاصيل يرجى زيارة صفحة شروط التسجيل',
    btnText: 'اقرأ المزيد'
  },
  {
    ImageSrc:
    '/assets/images/Slider/carousel-2.jpg',
      ImageAlt: 'nature2',
      Title: 'تواصل معنا',
      SubTitle: 'يمكنكم التواصل معنا',
      btnText: 'اقرأ المزيد'
  },
  {
    ImageSrc:
    '/assets/images/Slider/carousel-3.jpg',
      ImageAlt: 'person1',
      Title: 'مجلس الادارة',
      SubTitle: 'مجلس ادارة اتحاد المكاتب الهندسية والدور الاستشارية الكويتية',
      btnText: 'اقرأ المزيد'
  }
]
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnChanges {
  @Input() language = 'en';
  @Input() items: CarouselItem[] = [];
  @Input() indicators = true;
  @Input() controls = true;
  @Input() autoSlide = true;
  @Input() slideInterval = 5000;
  @Input() overlay = true;
  selectedIndex = 0;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['language']) {
      if(this.language === 'en') {
        this.items = items;
      }
      else {
        this.items = arabicItems;
      }
    }
  }
  ngOnInit(): void {
    if(this.autoSlide) {
      setInterval(() => {
        this.goNext();
      }, this.slideInterval)
    }
  }

  goBack() {
    if(this.selectedIndex === 0) {
      this.selectedIndex = this.items.length - 1;
    }
    else {
      this.selectedIndex--;
    }
  }
  goNext() {
    if(this.selectedIndex === this.items.length - 1) {
      this.selectedIndex = 0;
    }
    else {
      this.selectedIndex++;
    }
  }

}
