import {ImageInterface} from "./image.interface";
import {CommentInterface} from "./comment.interface";

export interface PostInterface{
  id?:string;
  text:string;
  title: string
  userId?:string;
  image?: ImageInterface;
  comments?: Array<CommentInterface>;
  imgSource?: any;
  link: string

}
