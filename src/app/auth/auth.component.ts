import { Component, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, ResPayload } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnDestroy {
    constructor(
        private auth: AuthService, 
        private router: Router,
        private compFacRes: ComponentFactoryResolver) {}

    isLogin: boolean = false;
    isLoading: boolean = false;
    error: string = null;
    compSub: Subscription;
    @ViewChild(PlaceholderDirective, {static: false}) hostRef: PlaceholderDirective;

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
                this.showErrorAlert(errRes);
            }
        )

        form.reset();
    }
    
    private showErrorAlert(message: string) {
        const alertCompFac = this.compFacRes.resolveComponentFactory(AlertComponent);
        const hostContRef = this.hostRef.viewContRef;

        hostContRef.clear();
        const compRef = hostContRef.createComponent(alertCompFac);
        compRef.instance.message = message;
        this.compSub = compRef.instance.close.subscribe(
            () => {
                this.compSub.unsubscribe();
                hostContRef.clear();
            }
        )
        

    }

    ngOnDestroy() {
        this.compSub.unsubscribe();
    }

}