import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import LanguageService from 'src/app/app-services/language.service';
import { SiteService } from 'src/app/app-services/site.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  isSending = this.siteService.isSendingContactUs$;
  frm = new FormGroup({
    Name: new FormControl('', Validators.required),
    Email: new FormControl('', [Validators.required,Validators.pattern(/^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/)]),
    PhoneNumber: new FormControl('', [Validators.required,Validators.minLength(8), Validators.maxLength(8)]),
    Subject: new FormControl('', Validators.required)
  })
  constructor(private siteService: SiteService,
              private snackBar: MatSnackBar,
              private languageService: LanguageService) { }

  ngOnInit(): void {
  }
  send() {
    if(this.frm.invalid) {
      return;
    }
    this.siteService.contactUsSend(this.frm.value).subscribe(x => {
      if(x) {
        this.snackBar.open(this.languageService.translate('Message Sent To Administration'), this.languageService.translate('Dismiss'), {duration: 2000});
        this.frm.reset();
      }
    })
  }

}
