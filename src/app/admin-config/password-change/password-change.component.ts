import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, exhaustMap } from 'rxjs';
import { AccountService } from 'src/app/app-services/account.service';
import { ConfirmService } from 'src/app/app-services/confirm.service';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  isLoading = this.accountService.isLogging;
  language = this.languageService.currentLanguage;
  frm = this.accountService.createOfficeChangePasswordForm();
  constructor(private deviceService: DeviceService,
              private accountService: AccountService,
              private confirm: ConfirmService,
              private snackBar: MatSnackBar,
              private languageService: LanguageService) { }

  ngOnInit(): void {
  }
  save() {
    if(this.frm.invalid) {
      return;
    }
    this.confirm.open({Type: 'change'}).pipe(
      filter(x => x),
      exhaustMap(() => {
        return this.accountService.httpOfficeChangePassword(this.frm.getRawValue())
      })
    )
    .subscribe(x => {
      this.snackBar.open(this.language === 'ar' ? x.MessageArabic! : x.Message!, this.languageService.translate('Dismiss'), {duration: 3000})
      this.frm.reset();
    });
  }
  reset() {

  }
}
