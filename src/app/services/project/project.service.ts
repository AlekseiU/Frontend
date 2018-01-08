import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
// Providers
import { ResponseService } from '../providers/response/response.service';
import { ErrorService } from '../providers/error/error.service';
import { UserService } from '../providers/user/user.service';
// Libraries
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// Interfaces
import { IProject } from '../../interfaces/project/project';

@Injectable()
export class ProjectService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private apiUrl = 'http://localhost:3000/projects';  // URL to web api

    constructor(
        private http: Http,
        private response: ResponseService,
        private error: ErrorService,
        private user: UserService
    ) { }

    /**
     * Выводит список проектов
     */
    list(): Observable<IProject[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });

        if (this.user.isAuth()) {
            this.user.setAuthHeader(headers);
        }

        return this.http.get(this.apiUrl, { headers: headers })
            .map(r => this.response.parse(r))
            .catch(this.error.handle);
    }

    /**
     * Отображает данные проекта
     * @param {Number} id идентификатор проекта
     */
    item(id: number): Observable<IProject> {
        const url = `${this.apiUrl}/${id}`;
        const headers = new Headers({ 'Content-Type': 'application/json' });

        if (this.user.isAuth()) {
            this.user.setAuthHeader(headers);
        }

        return this.http.get(url, { headers: headers })
                    .map(r => this.response.parse(r))
                    .catch(this.error.handle);
    }

    /**
     * Удаляет проект
     * @param {Number} id идентификатор проекта
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
     * Создает проект
     * @param {String} name имя проекта
     */
    create(name: string): Observable<IProject> {
        const headers = new Headers({ 'Content-Type': 'application/json' });

        if (this.user.isAuth()) {
            this.user.setAuthHeader(headers);
        }

        return this.http.post(
                        this.apiUrl,
                        JSON.stringify({
                            name: name,
                            pages: 0
                        }),
                        { headers: headers }
                    )
                    .map(r => this.response.parse(r))
                    .catch(this.error.handle);
    }

    /**
     * Обновляет проект
     * @param {IProject} project модель проекта
     */
    update(project: IProject): Observable<IProject> {
        const url = `${this.apiUrl}/${project.id}`;
        const headers = new Headers({ 'Content-Type': 'application/json' });

        if (this.user.isAuth()) {
            this.user.setAuthHeader(headers);
        }

        return this.http.put(
                        url,
                        JSON.stringify(project),
                        { headers: headers }
                    )
                    .map(r => this.response.parse(r))
                    .catch(this.error.handle);
    }
}
