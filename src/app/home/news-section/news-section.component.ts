import { Component, Input, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/app-services/device.service';

@Component({
  selector: 'app-news-section',
  templateUrl: './news-section.component.html',
  styleUrls: ['./news-section.component.scss']
})
export class NewsSectionComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
  }

}
