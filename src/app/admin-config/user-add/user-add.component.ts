import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { exhaustMap, filter } from 'rxjs';
import { AccountService } from 'src/app/app-services/account.service';
import { ConfirmService } from 'src/app/app-services/confirm.service';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';
import { UserManagerService } from 'src/app/app-services/user-manager.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  frm = this.accountService.createUserRegisterForm();
  roles$ = this.userManager.httpGetRoles();
  isLoadingRoles$ = this.userManager.isLoadingRoles$;
  isLoading = this.userManager.isAddingUser$;
  constructor(private deviceService: DeviceService,
              private languageService: LanguageService,
              private accountService: AccountService,
              private userManager: UserManagerService,
              private confirm: ConfirmService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
  }
  save() {
    if(this.frm.invalid) {
      return;
    }
    this.confirm.open({Type: 'add'}).pipe(
      filter(x => x),
      exhaustMap(() => {
        return this.userManager.httpAddUser(this.frm.value)
      })
    ).subscribe(x => {
      if(x) {
        this.snackBar.open(this.languageService.translate('User Added Successfully'), this.languageService.translate('Dismiss'), {duration:2000});
        this.router.navigateByUrl('/kfeoch-admin/config/users')
      }
    })
  }

}
