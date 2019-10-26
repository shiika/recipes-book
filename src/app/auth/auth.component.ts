import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, ResPayload } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})

export class AuthComponent {
    constructor(private auth: AuthService, private router: Router) {}

    isLogin: boolean = false;
    isLoading: boolean = false;
    error: string = null;

    switchLogin() {
        this.isLogin = !this.isLogin;
    }

    onSubmit(form: NgForm) {
        console.log(form);
        const email = form.value.email;
        const password = form.value.password;
        this.isLoading = true;
        this.error = null;
        let authObs: Observable<ResPayload>;


        if (this.isLogin) {
            authObs = this.auth.signIn(email, password);
        } else {
            authObs = this.auth.signUp(email, password);
        }

        authObs.subscribe(
            resData => {
                this.isLoading = false;
                this.router.navigate(['/recipes']);
                console.log(resData);
            },
            errRes => {
                console.log(errRes);
                this.isLoading = false;
                this.error = errRes;
            }
        )

        form.reset();
    }

}