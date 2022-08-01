import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from './user.component';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable()
export class AuthService implements HttpInterceptor {
    token: any = {};
    constructor(
        private _router: Router,
        private spinner: NgxSpinnerService,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinner.show();
        let currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            this.token = JSON.parse(currentUser!).token;
            User.token = this.token;

            // WARNING : If you open this code ngx-training link return 401 whatever send, its just example...

            // request = request.clone({
            //     setHeaders: {
            //         Authorization: "Bearer " + this.token
            //     }
            // })
        }
        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        localStorage.clear();
                        this._router.navigate(['/auth/signin']);
                    }
                }
                return throwError(() => err);
            }),
            finalize(() => this.spinner.hide()));
    };
}


