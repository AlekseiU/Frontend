import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
// Providers
import { ResponseService } from '../providers/response/response.service';
import { ErrorService } from '../providers/error/error.service';
import { UserService } from '../providers/user/user.service';
// Libaries
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// Interfaces
import { IData } from '../../interfaces/data/data';

@Injectable()
export class DataService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private apiUrl = 'http://localhost:3000/data';  // URL to web api

    constructor(
        private http: Http,
        private response: ResponseService,
        private error: ErrorService,
        private user: UserService
    ) {}

    /**
     * Выводит список Data объектов
     * @param {Number} id идентификатор проекта
     */
    list(id: number) {
        const url = `${this.apiUrl}/project/${id}`;
        const headers = new Headers({ 'Content-Type': 'application/json' });

        if (this.user.isAuth()) {
            this.user.setAuthHeader(headers);
        }

        return this.http.get(url, { headers: headers })
                    .map(r => this.response.parse(r))
                    .catch(this.error.handle);
    }

    /**
     * Удаляет Data объект
     * @param {Number} id иденфитикатор Data объекта
     */
    delete(id: number): Observable<number> {
        const url = `${this.apiUrl}/${id}`;
        const headers = new Headers({ 'Content-Type': 'application/json' });

        if (this.user.isAuth()) {
            this.user.setAuthHeader(headers);
        }

        return this.http.delete(url, { headers: headers })
                    .map(r => this.response.parse(r))
                    .catch(this.error.handle);
    }

    /**
     * Создает Data объект
     * @param {IData} data модель Data объекта
     */
    create(data: IData): Observable<IData> {
        const headers = new Headers({ 'Content-Type': 'application/json' });

        if (this.user.isAuth()) {
            this.user.setAuthHeader(headers);
        }

        return this.http.post(
                        this.apiUrl,
                        JSON.stringify(data),
                        { headers: headers }
                    )
                    .map(r => this.response.parse(r))
                    .catch(this.error.handle);
    }

    /**
     * Обновляет Data объект
     * @param {IData} data модель Data объекта
     */
    update(data: IData): Observable<IData> {
        const url = `${this.apiUrl}/${data.id}`;
        const headers = new Headers({ 'Content-Type': 'application/json' });

        if (this.user.isAuth()) {
            this.user.setAuthHeader(headers);
        }

        return this.http.put(
                        url,
                        JSON.stringify(data),
                        { headers: headers }
                    )
                    .map(r => this.response.parse(r))
                    .catch(this.error.handle);
    }
}
