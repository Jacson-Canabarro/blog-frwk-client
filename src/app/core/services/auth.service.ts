import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {UserAuthInterface} from "../models/user-auth.interface";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {TokenInterface} from "../models/token.interface";
import {UserService} from "./UserService";

@Injectable({
  providedIn: 'root'
})
export class AuthService{


  keyToken = 'token';
  constructor(private httpClient: HttpClient,
              private router: Router,
              private cookieService: CookieService,
              private userService: UserService) {
  }


  auth(obj: UserAuthInterface){
    return this.httpClient.post<TokenInterface>(environment.api.baseUrl + 'auth',obj)
      .subscribe(
        (token) =>{
          this.setToken(token.token);
          this.userService.getUser();
          this.router.navigate([""]).then(() => {
            window.location.reload();
          });
        },
        catchError(err => this.errorHandler(err)));
  }


  setToken(token:string){
    this.cookieService.set(this.keyToken,token, undefined,undefined,undefined,true);
  }



  getToken() {
    let token = this.cookieService.get(this.keyToken);
    if (token)
      return token;
    return null;
  }

  logout() {
    this.cookieService.delete(this.keyToken);
    this.cookieService.delete("user");
    this.router.navigate([""]).then(() => {
      window.location.reload();
    });
  }


  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }


}
