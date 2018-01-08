import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';
// Providers
import { ResponseService } from '../../providers/response/response.service';
import { ErrorService } from '../../providers/error/error.service';
// Libaries
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// Interfaces
import { IUser } from '../../../interfaces/user/user';

@Injectable()
export class UserService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private apiUrl = 'http://localhost:3000/user';  // URL to web api
    private localStorage = window.localStorage;

    public store: any = {
        token: this.localStorage.getItem('accessToken'),
        isAuth: (this.localStorage.getItem('accessToken') ? true : false),
    };

    constructor(
        private http: Http,
        private response: ResponseService,
        private error: ErrorService,
        private router: Router
    ) {}

    private remember(user: any) {
        this.localStorage.setItem('accessToken', user.token);

        this.store.email = (user.email ? user.email : null);
        this.store.token = (user.token ? user.token : null);
        this.store.isAuth = true;
    }

    /**
     * Регистрирует пользователя
     * @param user модель пользователя
     */
    public register(user: IUser): Observable<IUser> {
        return this.http.post(
                    `${this.apiUrl}/registration`,
                    JSON.stringify(user),
                    { headers: this.headers }
                )
                .map(r => {
                    const user = this.response.parse(r);
                    this.remember(user);

                    return user;
                })
                .catch(this.error.handle);
    }

    /**
     * Авторизует пользователя
     * @param user модель пользователя
     */
    public login(user: IUser): Observable<IUser> {
        return this.http.post(
                    `${this.apiUrl}/login`,
                    JSON.stringify(user),
                    { headers: this.headers }
                )
                .map(r => {
                    const user = this.response.parse(r);
                    this.remember(user);

                    return user;
                })
                .catch(this.error.handle);
    }

    /**
     * Сбрасывает авторизационныe данные
     */
    public logout(): void {
        this.localStorage.removeItem('accessToken');
        this.store.token = null;
        this.store.isAuth = false;
        this.router.navigate(['/']);
    }

    /**
     * Выставляет авторизационные заголовки
     * @param headers заголовки запроса
     */
    public setAuthHeader(headers: Headers): void {
        const token = this.localStorage.getItem('accessToken');

        if (token && headers) {
            headers.append('Authorization', `Bearer ${token}`);
        }
    }

    /**
     * Проверяет авторизован ли пользователь
     */
    public isAuth(): boolean {
        return this.store.isAuth;
    }
}
