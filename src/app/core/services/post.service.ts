import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {PostInterface} from "../models/post.interface";
import {environment} from "../../../environments/environment";
import {CommentInterface} from "../models/comment.interface";


@Injectable({
  providedIn: 'root'
})
export class PostService{

  constructor(private httpClient: HttpClient,
              private router: Router,
              private cookieService: CookieService) {
  }


  savePost(post: PostInterface){
    return this.httpClient.post(environment.api.baseUrl + 'v1/post', post);
  }

  getAll(){
    return this.httpClient.get<PostInterface[]>(environment.api.baseUrl + 'v1/post');
  }

  delete(userID?: string, postId?: string) {
    return this.httpClient.delete(environment.api.baseUrl + 'v1/post', {body:{userId: userID, postId:postId}});
  }

  sendComment(comment: CommentInterface){
    return this.httpClient.post(environment.api.baseUrl + 'v1/comment', comment)
  }

  deleteComment(comment: any){
    return this.httpClient.delete(environment.api.baseUrl + 'v1/comment', {body: comment})
  }
}
