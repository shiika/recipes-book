import { HttpInterceptor, HttpRequest, HttpHandler, HttpClientModule, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';
import { User } from './user.model';

@Injectable()

export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService, private http: HttpClientModule) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (req.url.includes("https://identitytoolkit.googleapis.com/v1/")) {
            return next.handle(req);
        }
        return this.authService.userAuthentication.pipe(
            take(1),
            exhaustMap(
                (user: User) => {
                    const newReq = req.clone({params: new HttpParams().set("auth", user.token)})
                    return next.handle(newReq);
                }
            )
        )
    }
}