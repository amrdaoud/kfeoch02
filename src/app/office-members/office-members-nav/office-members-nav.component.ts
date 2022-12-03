import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/app-services/device.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-office-members-nav',
  templateUrl: './office-members-nav.component.html',
  styleUrls: ['./office-members-nav.component.scss']
})
export class OfficeMembersNavComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  isTest = environment.test;
  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
  }

}
