import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AccountService } from '../app-services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService,
              private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!route.data['Roles'] || this.accountService.inRoles(['SuperUser'])) {
        return of(true);
      }
      const result = this.accountService.inRoles(route.data['Roles']);
      if(!result) {
        this.router.navigate(['/redirects/403'], {queryParams: {returnUrl: state.url}});
        return false;
      }
      return true;
  }

}
