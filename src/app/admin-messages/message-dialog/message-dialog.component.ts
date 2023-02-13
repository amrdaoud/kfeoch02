import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GuestMessage } from 'src/app/app-models/site-content';
import { SiteService } from 'src/app/app-services/site.service';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public message: GuestMessage,
              private siteService: SiteService,
              private dialogRef: MatDialogRef<MessageDialogComponent>) { }

  ngOnInit(): void {
    if(!this.message.IsRead) {
      this.siteService.readContactUsMessage(this.message.Id).subscribe(x => {
        if(x) {
          this.message.IsRead = true;
        }
      })
    }
  }
  unreadMEssage() {
    this.siteService.unreadContactUsMessage(this.message.Id).subscribe(x => {
      if(x) {
        this.message.IsRead = false;
        this.dialogRef.close();
      }
    })
  }

}
