import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { catchError, exhaustMap, filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { Role, User } from 'src/app/app-models/user-manager';
import { ConfirmService } from 'src/app/app-services/confirm.service';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';
import { UserManagerService } from 'src/app/app-services/user-manager.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  user$: Observable<User>;
  userId: string = '';
  isLoading: Observable<boolean>;
  isChangingPassword: Observable<boolean>;
  isChangingRoles: Observable<boolean>;
  roles$: Observable<Role[]>;
  inChangingPassword = false;
  inChangingRoles = false;
  assignedRoles: string[] = [];
  isDeactivating: Observable<boolean>;
  isActive = false;
  passwordControl = new FormControl('', Validators.required);
  constructor(private deviceService: DeviceService,
              private languageService: LanguageService,
              private userManager: UserManagerService,
              private snackBar: MatSnackBar,
              private confirm: ConfirmService,
              route: ActivatedRoute) {
                this.isLoading = userManager.isLoadingUser$;
                this.isChangingPassword = userManager.isChangingPassword$;
                this.isChangingRoles = userManager.isChangingRoles$;
                this.isDeactivating = userManager.isDeactivating$;
                this.roles$ = userManager.httpGetRoles();
                this.user$ = route.paramMap.pipe(
                  filter((paramMap: ParamMap) => paramMap.get('id') !== undefined),
                  map((paramMap: ParamMap) => paramMap.get('id')!),
                  tap((id: string) => this.userId = id),
                  switchMap((id: string) => userManager.httpGetUserById(id)),
                  tap(user => {
                    this.assignedRoles = user.Roles;
                    this.isActive = user.IsActive;
                  })
                )
              }

  ngOnInit(): void {
  }
  changePassword() {
    if(!this.userId || this.passwordControl.invalid) {
      return;
    }
    this.confirm.open({Type: 'change'}).pipe(
      exhaustMap(x => {
        if(x) {
          return  this.userManager.httpChangePassword(this.userId, this.passwordControl.value as string)
        } else {
          return of(null)
        }
      })
    )
   .subscribe(x => {
      if(x) {
        this.snackBar.open(this.languageService.translate('Password Changed'), this.languageService.translate('Dismiss'), {duration: 2000});
      }
      this.inChangingPassword = false;
    })
  }
  changeRoles() {
    this.confirm.open({Type: 'change'}).pipe(
      exhaustMap(x => {
        if(x) {
          return  this.userManager.httpChangeRoles(this.userId, this.assignedRoles)
        } else {
          return of(null)
        }
      })
    )
    .subscribe(x => {
      if(x) {
        this.snackBar.open(this.languageService.translate('Roles Changed'), this.languageService.translate('Dismiss'), {duration: 2000});
        this.inChangingRoles = false;
      }
    })
  }
  changeActivation(value: boolean) {
    if(value) {
      this.confirm.open({Type: 'change'}).pipe(
        exhaustMap(x => {
          if(x) {
            return this.userManager.httpActivateAccount(this.userId)
          } else {
            this.isActive = false;
            return of(null)
          }

        }),
        catchError((err) => {
          this.isActive = false;
          throw err;
        })
        )
      .subscribe(x => {
        if(x) {
          this.isActive = true;
          this.snackBar.open(this.languageService.translate('Account Activated Successfully'), this.languageService.translate('Dismiss'), {duration: 2000});
        } else {
          this.isActive = false;
        }
      })
    } else {
      this.confirm.open({Type: 'change'}).pipe(
        exhaustMap(x => {
          if(x) {
            return this.userManager.httpDeactivateAccount(this.userId)
          } else {
            this.isActive = true;
            return of(null)
          }
        }),
        catchError((err) => {
          this.isActive = true;
          throw err;
        })
        )
      .subscribe(x => {
        if(x) {
          this.isActive = false;
          this.snackBar.open(this.languageService.translate('Account Deactivated'), this.languageService.translate('Dismiss'), {duration: 2000});
        } else {
          this.isActive = true;
        }
      })
    }
  }

}
