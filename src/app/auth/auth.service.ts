import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface ResPayload {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: string;

}

@Injectable({providedIn: 'root'})

export class AuthService {
    constructor(private http: HttpClient, private router: Router) {}

    userAuthentication = new BehaviorSubject<User>(null);

    signUp(email: string, password: string) {
        return this.http.post<ResPayload>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA1WXbdvlBdrbk9KtDhLQ8W9aiFvWrG6AA", {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(
            catchError(this.handleError),
            tap(this.handleAuthentication.bind(this))
        )
    }

    signIn(email:string, password: string) {
        return this.http.post<ResPayload>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA1WXbdvlBdrbk9KtDhLQ8W9aiFvWrG6AA", {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleError),
            tap(
                this.handleAuthentication.bind(this)
            )
        )
    }

    logout() {
        this.userAuthentication.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem("userData");
    }

    autoLogout(expirationDuration: number) {
        setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    autoLogin() {
        const cachedUser = JSON.parse(localStorage.getItem("userData"));
        if (!cachedUser) {
            return;
        }
        const authedUser = new User(cachedUser.email, cachedUser.id, cachedUser._token, new Date(cachedUser._tokenExpirationDate));
        const expirationDuration = new Date(cachedUser._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogout(expirationDuration);
        this.userAuthentication.next(authedUser);
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errMessage = 'An unknown error occured!';
        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errMessage);
        }

        switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS': 
                errMessage = "This email already exists!";
        }

        return throwError(errorResponse);

    }

    private handleAuthentication(resData: ResPayload) {
        const expiresIn = new Date(new Date().getTime() + +resData.expiresIn * 1000);
        const user = new User(resData.email, resData.localId, resData.idToken, expiresIn);
        this.userAuthentication.next(user);
        this.autoLogout(+resData.expiresIn * 1000);
        localStorage.setItem("userData", JSON.stringify(user));
    }
}