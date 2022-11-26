import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/app-services/device.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-office-home',
  templateUrl: './office-home.component.html',
  styleUrls: ['./office-home.component.scss']
})
export class OfficeHomeComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  isTest = environment.test;
  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
  }

}
