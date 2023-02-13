import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/app-services/account.service';
import LanguageService from 'src/app/app-services/language.service';

@Component({
  selector: 'app-forget-receive',
  templateUrl: './forget-receive.component.html',
  styleUrls: ['./forget-receive.component.scss']
})
export class ForgetReceiveComponent implements OnInit {
  frm = this.accountService.createForgetReceiverForm(
                this.route.snapshot.queryParams['token'],
                this.route.snapshot.queryParams['email']);
  isLogging = this.accountService.isLogging;
  constructor(private route: ActivatedRoute,
              private accountService: AccountService,
              private languageService: LanguageService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
    console.log(this.frm.value)
  }
  resetPassword() {
    if(this.frm.invalid) {
      return;
    }
    this.accountService.httpForgetReceive(this.frm.value).subscribe(x => {
      this.snackBar.open(this.languageService.translate('Password Changed Successfully!'), this.languageService.translate('Dismiss'), {duration: 2000});
      this.router.navigateByUrl('/account/login')
    })
  }

}
