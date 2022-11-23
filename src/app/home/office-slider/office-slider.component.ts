import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HomeOffice } from 'src/app/app-models/office';
import { DeviceService } from 'src/app/app-services/device.service';

const items: HomeOffice[] = [
  {
    Id: 1,
    NameEnglish: 'Office1',
    NameArabic: 'مكتب1',
    LogoUrl: '/assets/images/office-logo.png'
  },
  {
    Id: 2,
    NameEnglish: 'Office1',
    NameArabic: 'مكتب1',
    LogoUrl: '/assets/images/OfficeLogos/office-logo.png'
  },
  {
    Id: 3,
    NameEnglish: 'Office1',
    NameArabic: 'مكتب1',
    LogoUrl: '/assets/images/OfficeLogos/office-logo.png'
  },
  {
    Id: 4,
    NameEnglish: 'Office1',
    NameArabic: 'مكتب1',
    LogoUrl: '/assets/images/OfficeLogos/office-logo.png'
  },
  {
    Id: 5,
    NameEnglish: 'Office1',
    NameArabic: 'مكتب1',
    LogoUrl: '/assets/images/OfficeLogos/office-logo.png'
  },
  {
    Id: 6,
    NameEnglish: 'Office1',
    NameArabic: 'مكتب1',
    LogoUrl: '/assets/images/OfficeLogos/office-logo.png'
  },
  {
    Id: 7,
    NameEnglish: 'Office1',
    NameArabic: 'مكتب1',
    LogoUrl: '/assets/images/OfficeLogos/office-logo.png'
  },
  {
    Id: 8,
    NameEnglish: 'Office1',
    NameArabic: 'مكتب1',
    LogoUrl: '/assets/images/OfficeLogos/office-logo.png'
  },
  {
    Id: 9,
    NameEnglish: 'Office1',
    NameArabic: 'مكتب1',
    LogoUrl: '/assets/images/OfficeLogos/office-logo.png'
  },
  {
    Id: 10,
    NameEnglish: 'Office1',
    NameArabic: 'مكتب1',
    LogoUrl: '/assets/images/OfficeLogos/office-logo.png'
  },
  {
    Id: 11,
    NameEnglish: 'Office1',
    NameArabic: 'مكتب1',
    LogoUrl: '/assets/images/OfficeLogos/office-logo.png'
  },
  {
    Id: 12,
    NameEnglish: 'Office1',
    NameArabic: 'مكتب1',
    LogoUrl: '/assets/images/OfficeLogos/office-logo.png'
  },
  {
    Id: 13,
    NameEnglish: 'Office1',
    NameArabic: 'مكتب1',
    LogoUrl: '/assets/images/OfficeLogos/office-logo.png'
  },
  {
    Id: 14,
    NameEnglish: 'Office1',
    NameArabic: 'مكتب1',
    LogoUrl: '/assets/images/OfficeLogos/office-logo.png'
  },
  {
    Id: 15,
    NameEnglish: 'Office1',
    NameArabic: 'مكتب1',
    LogoUrl: '/assets/images/OfficeLogos/office-logo.png'
  }

]

@Component({
  selector: 'app-office-slider',
  templateUrl: './office-slider.component.html',
  styleUrls: ['./office-slider.component.scss']
})
export class OfficeSliderComponent implements OnInit {
 isHandset = this.deviceService.isHandset$;
 @Input() items: any[] = items;
 @Input() value = 325;
 @Input() language = 'en';
  currentValue = 0;
 customOptions: OwlOptions = {
  loop: true,
  autoplay: true,
  autoplayHoverPause: true,
  autoplayMouseleaveTimeout: 1000,
  rtl: false,
  center: true,
  dots: true,
  autoHeight: false,
  autoWidth: true,
  fluidSpeed: true
  // responsive: {
  //   0: {
  //     items: 2,
  //   },
  //   600: {
  //     items: 2,
  //   },
  //   1000: {
  //     items: 4,
  //   },
  // },
};
  constructor(private deviceService: DeviceService) { }
  ngOnInit(): void {
    this.customOptions.rtl = this.language === 'en' ? false : true;
    this.startCounting();
  }

  startCounting() {
    setInterval(() => {
      if(this.currentValue < this.value) {
        this.currentValue++
      }
    }, 10)
  }

}
