import { Component, Input, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/app-services/device.service';

@Component({
  selector: 'app-welcome-section',
  templateUrl: './welcome-section.component.html',
  styleUrls: ['./welcome-section.component.scss']
})
export class WelcomeSectionComponent implements OnInit {
@Input() language = 'en';
isHandset = this.deviceService.isHandset$;
  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
  }

}
