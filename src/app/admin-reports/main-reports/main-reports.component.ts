import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/app-services/device.service';
import { ReportService } from 'src/app/app-services/report.service';

@Component({
  selector: 'app-main-reports',
  templateUrl: './main-reports.component.html',
  styleUrls: ['./main-reports.component.scss']
})
export class MainReportsComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  isLoadingOffices$ = this.reportService.isLoadingOffices$;
  isLoadingOwners$ = this.reportService.isLoadingOwners$;
  isLoadingSpecialities$ = this.reportService.isLoadingSpecialities$;
  isLoadingContacts$ = this.reportService.isLoadingContacts$;
  isLoadingLicenses$ = this.reportService.isLoadingLicenses$;
  constructor(private deviceService: DeviceService,
              private reportService: ReportService) { }

  ngOnInit(): void {
  }

  getOffices() {
    this.reportService.getOfficesReport().subscribe( x => {
      let dataType = x.type;
      let binaryData = [];
      binaryData.push(x);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        downloadLink.setAttribute('download', 'AllOffices.xlsx');
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    )
  }
  getOwners() {
    this.reportService.getOwnersReport().subscribe( x => {
      let dataType = x.type;
      let binaryData = [];
      binaryData.push(x);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        downloadLink.setAttribute('download', 'AllOwners.xlsx');
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    )
  }
  getSpecialities() {
    this.reportService.getSpecialitiesReport().subscribe( x => {
      let dataType = x.type;
      let binaryData = [];
      binaryData.push(x);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        downloadLink.setAttribute('download', 'AllSpecialities.xlsx');
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    )
  }
  getContacts() {
    this.reportService.getContactsReport().subscribe( x => {
      let dataType = x.type;
      let binaryData = [];
      binaryData.push(x);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        downloadLink.setAttribute('download', 'AllContacts.xlsx');
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    )
  }

  getLicenses() {
    this.reportService.getLicensesReport().subscribe( x => {
      let dataType = x.type;
      let binaryData = [];
      binaryData.push(x);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        downloadLink.setAttribute('download', 'AllLicenses.xlsx');
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    )
  }

}
