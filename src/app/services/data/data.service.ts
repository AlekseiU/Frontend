import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
// Providers
import { ResponseService } from '../../providers/response/response.service';
import { ErrorService } from '../../providers/error/error.service';
// Libaries
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// Component
import { DataComponent } from '../../components/data/data.component';

@Injectable()
export class DataService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private apiUrl = 'http://localhost:3000/data';  // URL to web api

    constructor(
        private http: Http,
        private response: ResponseService,
        private error: ErrorService
    ) {}

    /**
     * Выводит список Data объектов
     * @param {Number} id идентификатор проекта
     */
    list(id: number) {
        const url = `${this.apiUrl}/project/${id}`;

        return this.http.get(url)
                .map(r => this.response.parse(r))
                .catch(this.error.handle);
    }

    /**
     * Удаляет Data объект
     * @param {Number} id иденфитикатор Data объекта
     */
    delete(id: number): Observable<number> {
        const url = `${this.apiUrl}/${id}`;

        return this.http.delete(url, { headers: this.headers })
                .map(r => this.response.parse(r))
                .catch(this.error.handle);
    }

    /**
     * Создает Data объект
     * @param {DataComponent} data модель Data объекта
     */
    create(data: DataComponent): Observable<DataComponent> {
        return this.http.post(
                    this.apiUrl,
                    JSON.stringify(data),
                    { headers: this.headers }
                )
                .map(r => this.response.parse(r))
                .catch(this.error.handle);
    }

    /**
     * Обновляет Data объект
     * @param {DataComponent} data модель Data объекта
     */
    update(data: DataComponent): Observable<DataComponent> {
        const url = `${this.apiUrl}/${data.id}`;

        return this.http.put(
                    url,
                    JSON.stringify(data),
                    { headers: this.headers }
                )
                .map(r => this.response.parse(r))
                .catch(this.error.handle);
    }
}
