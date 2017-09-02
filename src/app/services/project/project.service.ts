import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ResponseService } from '../response/response.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ProjectComponent } from '../../components/project/project.component';

@Injectable()
export class ProjectService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private apiUrl = 'http://localhost:3000/projects';  // URL to web api

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    constructor(
        private http: Http,
        private response: ResponseService
    ) { }

    list(): Observable<ProjectComponent[]> {
        return this.http.get(this.apiUrl)
                .map(r => this.response.parse(r))
                .catch(this.handleError);
    }

    item(id: number): Observable<ProjectComponent> {
        const url = `${this.apiUrl}/${id}`;

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

    create(name: string): Observable<ProjectComponent> {
        return this.http.post(
                    this.apiUrl,
                    JSON.stringify({
                        name: name,
                        pages: 0
                    }),
                    { headers: this.headers }
                )
                .map(r => this.response.parse(r))
                .catch(this.handleError);
    }

    update(project: ProjectComponent): Observable<ProjectComponent> {
        const url = `${this.apiUrl}/${project.id}`;

        return this.http.put(
                    url,
                    JSON.stringify(project),
                    { headers: this.headers }
                )
                .map(r => this.response.parse(r))
                .catch(this.handleError);
    }
}
