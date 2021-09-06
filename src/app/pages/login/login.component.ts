import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../core/services/auth.service";
import {UserAuthInterface} from "../../core/models/user-auth.interface";
import {UserService} from "../../core/services/UserService";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  hide = true;

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {
      let auth: UserAuthInterface ={
        email: this.form.value.email,
        password: this.form.value.password
      };
      this.authService.auth(auth);

    }
  }


}
