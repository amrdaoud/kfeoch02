import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/app-services/device.service';

@Component({
  selector: 'app-footer-section',
  templateUrl: './footer-section.component.html',
  styleUrls: ['./footer-section.component.scss']
})
export class FooterSectionComponent implements OnInit {
isHandset = this.deviceService.isHandset$;
  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
  }

}
