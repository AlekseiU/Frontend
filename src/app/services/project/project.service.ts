import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
// Providers
import { ResponseService } from '../../providers/response/response.service';
import { ErrorService } from '../../providers/error/error.service';
// Libraries
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// Component
import { ProjectComponent } from '../../components/project/project.component';

@Injectable()
export class ProjectService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private apiUrl = 'http://localhost:3000/projects';  // URL to web api

    constructor(
        private http: Http,
        private response: ResponseService,
        private error: ErrorService
    ) { }

    /**
     * Выводит список проектов
     */
    list(): Observable<ProjectComponent[]> {
        return this.http.get(this.apiUrl)
                .map(r => this.response.parse(r))
                .catch(this.error.handle);
    }

    /**
     * Отображает данные проекта
     * @param {Number} id идентификатор проекта
     */
    item(id: number): Observable<ProjectComponent> {
        const url = `${this.apiUrl}/${id}`;

        return this.http.get(url)
                .map(r => this.response.parse(r))
                .catch(this.error.handle);
    }

    /**
     * Удаляет проект
     * @param {Number} id идентификатор проекта
     */
    delete(id: number): Observable<number> {
        const url = `${this.apiUrl}/${id}`;

        return this.http.delete(url, { headers: this.headers })
                .map(r => this.response.parse(r))
                .catch(this.error.handle);
    }

    /**
     * Создает проект
     * @param {String} name имя проекта
     */
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
                .catch(this.error.handle);
    }

    /**
     * Обновляет проект
     * @param {ProjectComponent} project модель проекта
     */
    update(project: ProjectComponent): Observable<ProjectComponent> {
        const url = `${this.apiUrl}/${project.id}`;

        return this.http.put(
                    url,
                    JSON.stringify(project),
                    { headers: this.headers }
                )
                .map(r => this.response.parse(r))
                .catch(this.error.handle);
    }
}
