import {Component, OnInit, AfterViewChecked} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {CommentComponent} from "../../core/components/comment/comment.component";
import {PostService} from "../../core/services/post.service";
import {PostInterface} from "../../core/models/post.interface";
import {DomSanitizer} from "@angular/platform-browser";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserService} from "../../core/services/UserService";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewChecked {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;
  text = new FormControl('', [Validators.required]);
  url: string | ArrayBuffer | null | undefined = '';
  posts: PostInterface[] = [];
  userLogged: any;

  constructor(private _bottomSheet: MatBottomSheet,
              private postService: PostService,
              private sanitizer: DomSanitizer,
              private _snackBar: MatSnackBar,
              private router: Router,
              private userService:UserService) {
  }

  ngAfterViewChecked(): void {
    this.setImgSource();
    }

  openBottomSheet(userId?: string, postId?: string, comment?: any[]): void {
    this._bottomSheet.open(CommentComponent , {
      data: {userId: userId, postId:postId, comments: comment }
    });
  }

  ngOnInit(): void {
    this.getUser();
    this.getPosts();
  }

  getPosts(){
    this.postService.getAll().subscribe(
      (posts) => this.posts = posts);
  }

  getUser(){
    this.userLogged  = this.userService.getUserLogged();
  }

  deletePost(userId?: string, postId?: string){
    this.postService.delete(userId, postId).subscribe((res) => {
      this.opanSnack("Deletado com sucesso!");
      this.router.navigate([""]).then(() => {
        window.location.reload();
      });
    });
  }

  setImgSource(){
   this.posts.forEach(p =>{
      let imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${p.image?.content}`);
      p.imgSource = imageSource
    })
  }

  opanSnack(msg: string){
    this._snackBar.open(msg, 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000
    });
  }


}
