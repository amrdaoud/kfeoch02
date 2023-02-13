import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { HomeOffice, Office } from 'src/app/app-models/office';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';



@Component({
  selector: 'app-office-slider',
  templateUrl: './office-slider.component.html',
  styleUrls: ['./office-slider.component.scss']
})
export class OfficeSliderComponent implements OnInit {
 language$ = this.languageService.currentLanguage$;
 isHandset = this.deviceService.isHandset$;
 searchControl  =new FormControl('');
 @Input() items: any[] = [];
 @Input() value1 = 325;
 @Input() value2 = 325;
 @Input() value3 = 325;
 @Input() language = 'en';
  currentValue1 = 0;
  currentValue2 = 0;
  currentValue3 = 0;
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
  constructor(private deviceService: DeviceService,
              private languageService: LanguageService,
              private router: Router) { }
  ngOnInit(): void {
    this.languageService.currentDirection$.subscribe(dir => {
      this.customOptions.rtl = dir ==='rtl';
      this.customOptions = JSON.parse(JSON.stringify(this.customOptions))
    })
    this.startCounting();
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(val => this.goToSearch(val!))
  }

  startCounting() {
    setInterval(() => {
      if(this.currentValue1 < this.value1) {
        this.currentValue1++
      }
      if(this.currentValue2 < this.value2) {
        this.currentValue2++
      }
      if(this.currentValue3 < this.value3) {
        this.currentValue3++
      }
    }, 10)
  }

  goToSearch(searchQuery: string) {
    this.router.navigate(['/site-offices'], {queryParams: {searchQuery: searchQuery}})
  }
  goToOfficeSite(office: Office) {
    this.router.navigate(['/site-offices', office.Id] )
  }

}
