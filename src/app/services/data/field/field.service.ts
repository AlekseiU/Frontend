import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
// Providers
import { ResponseService } from '../../../providers/response/response.service';
import { ErrorService } from '../../../providers/error/error.service';
// Libraries
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// Component
import { DataComponent } from '../../../components/data/data.component';

@Injectable()
export class FieldService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private apiUrl = 'http://localhost:3000/data/fields';  // URL to web api

    constructor(
        private http: Http,
        private response: ResponseService,
        private error: ErrorService
    ) {}

    /**
     * Удаляет поле из объекта
     * @param {Number} id идентификатор поля
     */
    delete(id: number): Observable<number> {
        const url = `${this.apiUrl}/${id}`;

        return this.http.delete(url, { headers: this.headers })
                .map(r => this.response.parse(r))
                .catch(this.error.handle);
    }

    /**
     * Создает поле в объекте
     * @param {DataComponent} field модель поля
     */
    create(field): Observable<DataComponent> {
        return this.http.post(
                    this.apiUrl,
                    JSON.stringify(field),
                    { headers: this.headers }
                )
                .map(r => this.response.parse(r))
                .catch(this.error.handle);
    }
}
