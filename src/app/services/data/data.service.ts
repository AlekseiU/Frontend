import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ResponseService } from '../response/response.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { DataComponent } from '../../components/data/data.component';

@Injectable()
export class DataService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private apiUrl = 'http://localhost:3000/data';  // URL to web api

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    constructor(
        private http: Http,
        private response: ResponseService
    ) {}

    list(id: number) {
        const url = `${this.apiUrl}/project/${id}`;

        return this.http.get(url)
                .map(r => this.response.parse(r))
                .catch(this.handleError);
    }

    delete(id: number): Observable<number> {
        const url = `${this.apiUrl}/${id}`;

        return this.http.delete(url, { headers: this.headers })
                .map(r => this.response.parse(r))
                .catch(this.handleError);
    }

    create(name: string, projectId: number): Observable<DataComponent> {
        return this.http.post(
                    this.apiUrl,
                    JSON.stringify({
                        name: name,
                        coordinates: {
                            x: null,
                            y: null
                        },
                        fullScreen: false,
                        project: projectId,
                        content: []
                    }),
                    { headers: this.headers }
                )
                .map(r => this.response.parse(r))
                .catch(this.handleError);
    }

    update(data: DataComponent): Observable<DataComponent> {
        const url = `${this.apiUrl}/${data.id}`;

        return this.http.put(
                    url,
                    JSON.stringify(data),
                    { headers: this.headers }
                )
                .map(r => this.response.parse(r))
                .catch(this.handleError);
    }
}
