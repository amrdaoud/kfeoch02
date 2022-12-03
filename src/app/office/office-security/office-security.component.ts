import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/app-services/device.service';

@Component({
  selector: 'app-office-security',
  templateUrl: './office-security.component.html',
  styleUrls: ['./office-security.component.scss']
})
export class OfficeSecurityComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
  }

}
