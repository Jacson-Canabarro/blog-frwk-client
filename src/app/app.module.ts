import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material.module";
import {LoginComponent} from "./pages/login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NavbarComponent} from "./core/components/navbar/navbar.component";
import { SigupComponent } from './pages/sigup/sigup.component';
import {IfAuthorDirective} from "./core/directives/if-author.directive";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgxMatFileInputModule} from "@angular-material-components/file-input";
import { HomeComponent } from './pages/home/home.component';
import { DialogComponent } from './core/components/dialog/dialog.component';
import { CommentComponent } from './core/components/comment/comment.component';
import {AuthInterceptor} from "./core/interceptor/auth.interceptor";

const authInterceptor =  {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SigupComponent,
    IfAuthorDirective,
    HomeComponent,
    DialogComponent,
    CommentComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MaterialModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        NgxMatFileInputModule,
        FormsModule
    ],
  providers: [authInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
