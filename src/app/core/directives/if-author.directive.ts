import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {UserService} from "../services/UserService";

@Directive({
  selector: '[appIfAuth]'
})
export class IfAuthorDirective implements OnInit{

  @Input() public appIfAuth!: any;

  constructor(private viewContainerRef: ViewContainerRef,
              private templateRef: TemplateRef<any>,
              private userService: UserService) {
  }

  ngOnInit(): void {

    const user = this.userService.getUserLogged();
    if (!user) {
      this.viewContainerRef.clear();
    }


    if (user.id !== this.appIfAuth) {
      this.viewContainerRef.clear();
    } else {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

}
