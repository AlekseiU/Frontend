import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ResponseService } from '../../response/response.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { DataComponent } from '../../../components/data/data.component';

@Injectable()
export class FieldService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private apiUrl = 'http://localhost:3000/data/fields';  // URL to web api

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    constructor(
        private http: Http,
        private response: ResponseService
    ) {}

    delete(id: number): Observable<number> {
        const url = `${this.apiUrl}/${id}`;

        return this.http.delete(url, { headers: this.headers })
                .map(r => this.response.parse(r))
                .catch(this.handleError);
    }

    create(field): Observable<DataComponent> {
        return this.http.post(
                    this.apiUrl,
                    JSON.stringify(field),
                    { headers: this.headers }
                )
                .map(r => this.response.parse(r))
                .catch(this.handleError);
    }
}
