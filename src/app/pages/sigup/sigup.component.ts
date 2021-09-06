import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../core/services/UserService";
import {UserInterface} from "../../core/models/user.interface";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sigup',
  templateUrl: './sigup.component.html',
  styleUrls: ['./sigup.component.css']
})
export class SigupComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;

  constructor(private userService: UserService,
              private _snackBar: MatSnackBar,
              private router: Router) {
  }

  hide = true;
  form: FormGroup = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl(''),
    name: new FormControl(''),
    lastName: new FormControl(''),
  });
  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();
  progressBar = true;


  submit() {
    this.progressBar = false;
    if (this.form.valid) {
      let userForm: UserInterface ={
        email: this.form.value.email,
        name: this.form.value.name,
        lastName: this.form.value.name,
        password: this.form.value.password
      };
      this.userService.create(userForm).subscribe(
        (user) =>{
          this.userService.setUser(user);
          this.progressBar = true;
          this.router.navigateByUrl('/login');
          this.opanSnack("Cadastro realizado com sucesso!")
        },
        error1 => {this.opanSnack("Erro ao cadastrar o usuario, verifique os dados!")}
        )
    }
  }

  opanSnack(msg: string){
    this._snackBar.open(msg, 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000
    });
  }
}
