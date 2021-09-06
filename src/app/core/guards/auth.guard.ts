import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";


@Injectable()
export class AuthGuard implements CanActivate{


  constructor(private router: Router,
              private authService: AuthService,
  ) { }



  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean |
    UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = this.authService.getToken();
    if (token) {
      return true;
    }
    else {
      this.router.navigate([''])
      return false;
    }
  }
}
