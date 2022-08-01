import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from '../auth/user.component';


const users: User[] = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) 
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/auth/local') && method === 'POST':
                    return authenticate();
                default:
                    return next.handle(request);
            }
        }

        function authenticate() {
            const { username, password } = body;
            if (username == "angular" && password == "!@ngular2022*") {
                return ok({
                    id: 1,
                    username: username,
                    token: 'fake-jwt-token'
                })
            } else {
                return error('Username or password is incorrect');
            }
        }

        function ok(body?: any) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message: any) {
            return throwError({ error: { message } });
        }
    }
}
