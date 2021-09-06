import { Component} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {ImageInterface} from "../../models/image.interface";
import {PostInterface} from "../../models/post.interface";
import {UserService} from "../../services/UserService";
import {PostService} from "../../services/post.service";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;

  constructor(private userService: UserService,
              private postService: PostService,
              private _snackBar: MatSnackBar,
              private router: Router) { }

  text = new FormControl('', [Validators.required]);
  title = new FormControl('', [Validators.required]);
  link = new FormControl('', [Validators.required]);
  urlImg: FormControl = new FormControl('', [Validators.required]);
  url: string | ArrayBuffer | null | undefined = '';
  file?: File;
  arrayBuffer: any


  getErrorMessage() {
    if (this.text.hasError('required')){
      return 'O texto é obrigatório';
    } else if(this.title.hasError('required')){
      return 'O título é obrigatório';
    }else if (this.link.hasError('required')){
      return 'O link é obrigatório';
    }else if(this.urlImg.hasError('required')){
      return 'O imagem é obrigatoria';
    }
    return null;
  }


  onSelectFile(event:any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      let converter = new FileReader();
      this.file = event.target.files[0];
      converter.readAsArrayBuffer(event.target.files[0]);
      reader.readAsDataURL(event.target.files[0]);
      converter.onload = (e) =>{
        this.arrayBuffer = e.target?.result;
      }
      reader.onload = (event) => {
        this.url = event.target?.result
      }
    }
  }

  onSubmit() {
    let userLogged = this.userService.getUserLogged();
    let base64 = btoa(
      new Uint8Array(this.arrayBuffer)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    let img: ImageInterface = {
      content: base64,
       name: this.file?.name
    }
    let post: PostInterface = {
      text: this.text.value,
      userId: userLogged?.id,
      image: img,
      link: this.link.value,
      title: this.title.value

    }
    this.postService.savePost(post).subscribe(
      (res) =>{

        this.router.navigate([""]).then(() => {
          window.location.reload();
        });
        this.opanSnack("Postagem feita com sucesso!")
      },
      error => {this.opanSnack("Erro ao salvar a postagem, verifique todos os campos ou Imagem.")}
    )
  }

  opanSnack(msg: string){
    this._snackBar.open(msg, 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000
    });
  }
}
