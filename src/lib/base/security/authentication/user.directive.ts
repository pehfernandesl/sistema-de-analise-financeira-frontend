import { Directive, ElementRef, Input, OnInit } from "@angular/core";
import { User } from "./user";
import { Authentication } from "./authentication";

@Directive({ selector: '[user]' })
export class UserDirective implements OnInit {

    @Input()
    user: string;

    constructor(private el: ElementRef, private authenticationService: Authentication<User>) { }

    ngOnInit(): void {
        if (this.authenticationService.isAuthenticated()) {
            let user = this.authenticationService.getUser();
            this.el.nativeElement.innerHTML += this.user ? user[this.user] : user.name;
        }
    }

}
