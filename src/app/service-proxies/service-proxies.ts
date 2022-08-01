import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../auth/user.component';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthServiceProxy {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/auth/local`, { username, password })
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null!);
    }
}

@Injectable({ providedIn: 'root' })
export class BlogServiceProxy {

    private baseURL = 'https://ngx-training.com';  // URL to web api

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient) { }

    /** GET bloges from the server */
    getBlogs(): Observable<any[]> {
        return this.http.get<any[]>(this.baseURL + '/posts')
            .pipe(
                tap(_ => this.log('fetched bloges')),
                catchError(this.handleError<any[]>('getBloges', []))
            );
    }

    /** GET blog by id. Will 404 if id not found */
    getBlog(id: number): Observable<any> {
        const url = `${this.baseURL}/posts/${id}`;
        return this.http.get<any>(url).pipe(
            tap(_ => this.log(`fetched blog id=${id}`)),
            catchError(this.handleError<any>(`getBlog id=${id}`))
        );
    }

    /** POST: add a new blog to the server */
    createBlog(blog: any): Observable<any> {
        return this.http.post<any>(this.baseURL, blog, this.httpOptions).pipe(
            tap((newBlog: any) => this.log(`added blog w/ id=${newBlog.id}`)),
            catchError(this.handleError<any>('createBlog'))
        );
    }

    /** DELETE: delete the blog from the server */
    deleteBlog(id: number): Observable<any> {
        const url = `${this.baseURL}/${id}`;

        return this.http.delete<any>(url, this.httpOptions).pipe(
            tap(_ => this.log(`deleted blog id=${id}`)),
            catchError(this.handleError<any>('deleteBlog'))
        );
    }

    /** PUT: update the blog on the server */
    updateBlog(blog: any): Observable<any> {
        return this.http.put(this.baseURL, blog, this.httpOptions).pipe(
            tap(_ => this.log(`updated blog id=${blog.id}`)),
            catchError(this.handleError<any>('updateBlog'))
        );
    }


    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.error(error);

            this.log(`${operation} failed: ${error.message}`);

            return of(result as T);
        };
    }

    private log(message: string) {
        // this.messageService.add(`BlogService: ${message}`);
        console.log(message)
    }
}


export class loginDTO implements IloginDTO {
    identifier: string | undefined;
    password: string | undefined;
}

export interface IloginDTO {
    identifier: string | undefined;
    password: string | undefined;
}