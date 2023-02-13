import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/app-services/account.service';
import LanguageService from 'src/app/app-services/language.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  frm = this.accountService.createAdminLoginForm();
  isLogging = this.accountService.isLogging;
  constructor(private accountService:AccountService,
              private router: Router,
              private snackBar: MatSnackBar,
              private languageService: LanguageService) { }

  ngOnInit(): void {
  }
  login() {
    if(this.frm.invalid) {
      return;
    }
    this.accountService.httpAdminLogin(this.frm.value).subscribe(x => {
      if(x && x.IsAuthenticated) {
        this.router.navigateByUrl('/kfeoch-admin');
      }
      else {
        this.snackBar.open(this.languageService.translate('Please Check Username or Password!'),this.languageService.translate('Dismiss'),{duration: 2000})
      }
    })
  }

}
