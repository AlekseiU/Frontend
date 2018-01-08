import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
// Providers
import { ResponseService } from '../../providers/response/response.service';
import { ErrorService } from '../../providers/error/error.service';
// Libraries
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// Interfaces
import { IProject } from '../../interfaces/project/project';

@Injectable()
export class ScrapperService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private apiUrl = 'http://localhost:3000/scrap';  // URL to web api

    constructor(
        private http: Http,
        private response: ResponseService,
        private error: ErrorService
    ) {}

    /**
     * Парсит урл и возвращает превью
     * @param {String} url ссылка на сайт
     */
    parse(url: string): Observable<IProject> {
        return this.http.post(
                    this.apiUrl,
                    JSON.stringify({
                        url: url,
                    }),
                    { headers: this.headers }
                )
                .map(r => this.response.parse(r))
                .catch(this.error.handle);
    }
}
