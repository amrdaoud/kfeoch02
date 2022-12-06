import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { exhaustMap, filter, of } from 'rxjs';
import { AccountService } from 'src/app/app-services/account.service';
import { ConfirmService } from 'src/app/app-services/confirm.service';
import { DeviceService } from 'src/app/app-services/device.service';

@Component({
  selector: 'app-office-security',
  templateUrl: './office-security.component.html',
  styleUrls: ['./office-security.component.scss']
})
export class OfficeSecurityComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  isLoading = this.accountService.isLogging;
  frm = this.accountService.createOfficeChangePasswordForm();
  constructor(private deviceService: DeviceService,
              private accountService: AccountService,
              private confirm: ConfirmService,
              private snackBar: MatSnackBar,
              private translateService: TranslateService) { }

  ngOnInit(): void {
  }
  save() {
    if(this.frm.invalid) {
      return;
    }
    this.confirm.open('Are you sure you want to change password?').pipe(
      filter(x => x),
      exhaustMap(() => {
        return this.accountService.httpOfficeChangePassword(this.frm.getRawValue())
      })
    )
    .subscribe(x => {
      this.snackBar.open(x.Message!, this.translateService.instant('Dismiss'), {duration: 3000})
      this.frm.reset();
    });
  }
  reset() {

  }

}
