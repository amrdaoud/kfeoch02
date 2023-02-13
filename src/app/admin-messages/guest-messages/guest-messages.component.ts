import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, switchMap } from 'rxjs';
import { DynamicTableByndingModel } from 'src/app/app-models/shared';
import { GuestMessage, gusetMessagesColumns } from 'src/app/app-models/site-content';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';
import { SiteService } from 'src/app/app-services/site.service';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-guest-messages',
  templateUrl: './guest-messages.component.html',
  styleUrls: ['./guest-messages.component.scss']
})
export class GuestMessagesComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  data = new Observable<GuestMessage[]>();
  dataSize = this.siteService.guestMessagesSize$;
  columnsDef = gusetMessagesColumns.nonHandset;
  isLoading = this.siteService.isSendingContactUs$;
  language$ = this.languageService.currentLanguage$;
  constructor(private deviceService:DeviceService,
              private languageService: LanguageService,
              private siteService: SiteService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.isHandset.subscribe(x => {
      if(x) {
        this.columnsDef = gusetMessagesColumns.handset;
      }
      else {
        this.columnsDef = gusetMessagesColumns.nonHandset;
      }
    })
  }
  changeBinding(filterObservable: Observable<DynamicTableByndingModel>) {
    this.data = filterObservable.pipe(
      switchMap(filter => {
        return this.siteService.getContactUsMessages(filter)
      })
    );
  }
  goToMessage(message: GuestMessage) {
    this.dialog.open(MessageDialogComponent, {data: message, panelClass: 'dialog-no-padding'});
  }

}
