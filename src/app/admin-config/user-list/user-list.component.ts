import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, userColumns } from 'src/app/app-models/user-manager';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';
import { UserManagerService } from 'src/app/app-services/user-manager.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  data = this.userManager.httpGetAllUsers();
  language$ = this.languageService.currentLanguage$;
  isLoading = this.userManager.isLoadingUsers$;
  columns = userColumns;
  constructor(private deviceService: DeviceService,
              private userManager: UserManagerService,
              private languageService: LanguageService,
              private router: Router) { }

  ngOnInit(): void {
  }

  goToUser(user: User) {
    this.router.navigateByUrl('/kfeoch-admin/config/users/' + user.Id)
  }

}
