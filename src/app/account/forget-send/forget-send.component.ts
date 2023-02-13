import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/app-services/account.service';

@Component({
  selector: 'app-forget-send',
  templateUrl: './forget-send.component.html',
  styleUrls: ['./forget-send.component.scss']
})
export class ForgetSendComponent implements OnInit {
  isLogging = this.accountService.isLogging;
  frm = this.accountService.createForgetSenderForm();
  constructor(private accountService :AccountService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  send() {
    if(this.frm.invalid) {
      return;
    }
      this.accountService.httpForgetSend(this.frm.value).subscribe(x => {
      this.snackBar.open('Email Sent Successfully!', 'Dismiss', {duration: 2000});
    })
  }

}
