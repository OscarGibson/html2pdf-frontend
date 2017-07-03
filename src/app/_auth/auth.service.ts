import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GlobalVariable } from '../app.global'

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    IsUserLogIn():boolean {
      let isUserLogIn:string = localStorage.getItem('isUserLogIn')
      if (isUserLogIn == 'true') {
        return true
      }
      if (isUserLogIn == 'false') {
        return false
      }
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.IsUserLogIn()) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate([GlobalVariable.innerLinks.Auth.path],
          { queryParams: { returnUrl: state.url }});
        return false;
    }
}
