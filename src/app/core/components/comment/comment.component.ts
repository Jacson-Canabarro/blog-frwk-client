import {AfterViewChecked, Component, Inject, Input, OnInit} from '@angular/core';
import {CommentInterface} from "../../models/comment.interface";
import {MAT_BOTTOM_SHEET_DATA} from "@angular/material/bottom-sheet";
import {PostService} from "../../services/post.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/UserService";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {


  text: string ="";

  comments: any[] = [];

  user?: boolean = false;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: {userId: string, postId: string, comments: any[]},
              private postService: PostService, private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.getComments();
    this.isUserOn();
    }


  send() {
    let comment: CommentInterface ={
      text: this.text,
      postId: this.data.postId,
      userId: this.data.userId
    }
    this.postService.sendComment(comment).subscribe(
      (res)=> {
        this.router.navigate([""]).then(() => {
          window.location.reload();
        });
      }
    );
  }

  getComments(){
    this.comments = this.data.comments;
  }
  isUserOn(){
    let userLogged = this.userService.getUserLogged();
    if(userLogged){
      this.user = true
    }
  }

  delete() {
   let obj =  {userId: this.data.userId, postId: this.data.postId}
    console.log(obj);
   this.postService.deleteComment(obj).subscribe(
     (res)=>{
       this.router.navigate([""]).then(() => {
         window.location.reload();
       });
     }
   )
  }
}
