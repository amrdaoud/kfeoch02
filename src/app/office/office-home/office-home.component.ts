import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/app-services/device.service';

@Component({
  selector: 'app-office-home',
  templateUrl: './office-home.component.html',
  styleUrls: ['./office-home.component.scss']
})
export class OfficeHomeComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
  }

}
