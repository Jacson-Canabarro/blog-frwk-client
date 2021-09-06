import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {UserInterface} from "../models/user.interface";
import {environment} from "../../../environments/environment";
import {Observable, throwError} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UserService{


  userKey = "user";

  constructor(private httpClient: HttpClient,
              private router: Router,
              private cookieService: CookieService) {
  }


  create(userInterface: UserInterface): Observable<UserInterface>{
    return this.httpClient.post<UserInterface>(environment.api.baseUrl + 'v1/user', userInterface);
  }

  getUser(){
     this.httpClient.get<UserInterface>(environment.api.baseUrl + 'v1/user').subscribe(
       (user) =>{
         this.setUser(user);
       },
       error => this.errorHandler(error)
     );
  }



  setUser(user: UserInterface){
    this.cookieService.set(this.userKey,JSON.stringify(user), undefined,undefined,undefined,true);
  }

  getUserLogged(){
    let userCookie = this.cookieService.get(this.userKey);
    if (userCookie){
      return JSON.parse(userCookie);
    }
    return "";
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
