import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/app-services/account.service';
import LanguageService from 'src/app/app-services/language.service';

@Component({
  selector: 'app-email-resend',
  templateUrl: './email-resend.component.html',
  styleUrls: ['./email-resend.component.scss']
})
export class EmailResendComponent implements OnInit {
  isLogging = this.accountService.isLogging;
  frm = this.accountService.createEmailForm();
  constructor(private accountService :AccountService,
              private languageService: LanguageService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  resend() {
    if(this.frm.invalid) {
      return;
    }
    this.accountService.httpResendEmailConfirmation(this.frm.get('Email')?.value).subscribe(x => {
      this.snackBar.open(this.languageService.translate('Email Sent Successfully!'), this.languageService.translate('Dismiss'), {duration: 2000});
    })
  }

}
