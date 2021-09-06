import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/UserService";
import {AuthService} from "../../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isUserLogged: boolean =  false;
  constructor(private userService: UserService, private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    let user = this.userService.getUserLogged();
    if(user)
      this.isUserLogged = true

  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logout() {
    this.authService.logout();
  }
}
