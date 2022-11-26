import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { AccountService } from 'src/app/app-services/account.service';
import { ConfirmService } from 'src/app/app-services/confirm.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-office-nav',
  templateUrl: './office-nav.component.html',
  styleUrls: ['./office-nav.component.scss']
})
export class OfficeNavComponent implements OnInit {
  isTest = environment.test;
  constructor(private accountService: AccountService,
              private router: Router,
              private confirm: ConfirmService) { }

  ngOnInit(): void {
  }
  logOut() {
    this.confirm.open('Are you sure you want to logout?').pipe(
      filter(x => x)
    ).subscribe(() => {
      this.accountService.logOut();
      this.router.navigateByUrl('/account/login');
    })

  }

}
