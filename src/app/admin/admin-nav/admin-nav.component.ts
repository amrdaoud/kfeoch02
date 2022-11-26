import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/app-services/account.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent implements OnInit {
  userName = this.accountService.getUserName();
  constructor(private accountService: AccountService,
              private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.accountService.logOut();
    this.router.navigateByUrl('/');

  }

}
