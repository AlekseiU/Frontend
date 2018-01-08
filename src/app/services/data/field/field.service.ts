import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
// Providers
import { ResponseService } from '../../../providers/response/response.service';
import { ErrorService } from '../../../providers/error/error.service';
import { UserService } from '../../../providers/user/user.service';
// Libraries
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// Interfaces
import { IField } from '../../../interfaces/data/field/field';

@Injectable()
export class FieldService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private apiUrl = 'http://localhost:3000/data/fields';  // URL to web api

    constructor(
        private http: Http,
        private response: ResponseService,
        private error: ErrorService,
        private user: UserService
    ) {}

    /**
     * Удаляет поле из объекта
     * @param {Number} id идентификатор поля
     */
    delete(id: number): Observable<IField> {
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
     * Создает поле в объекте
     * @param {iField} field модель поля
     */
    create(field: IField): Observable<IField> {
        const headers = new Headers({ 'Content-Type': 'application/json' });

        if (this.user.isAuth()) {
            this.user.setAuthHeader(headers);
        }

        return this.http.post(
                        this.apiUrl,
                        JSON.stringify(field),
                        { headers: headers }
                    )
                    .map(r => this.response.parse(r))
                    .catch(this.error.handle);
    }
}
