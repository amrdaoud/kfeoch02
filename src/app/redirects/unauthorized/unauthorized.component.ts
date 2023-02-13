import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {
  returnUrl: string;
  constructor(private router: Router,
              private route: ActivatedRoute) {
                this.returnUrl = route.snapshot.queryParams['returnUrl']
   }

  ngOnInit(): void {
  }
  goToLogin() {
    if(this.returnUrl && this.returnUrl.toLowerCase().includes('kfeoch-admin')) {
      this.router.navigate(['/account/kfeoch-admin-login'], {queryParams: {returnUrl: this.returnUrl}});
    } else {
      this.router.navigate(['/account/login'], {queryParams: {returnUrl: this.returnUrl}});
    }

  }

}
