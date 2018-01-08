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
import { IGroup } from '../../../interfaces/data/group/group';

@Injectable()
export class GroupService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private apiUrl = 'http://localhost:3000/data/groups';  // URL to web api

    constructor(
        private http: Http,
        private response: ResponseService,
        private error: ErrorService,
        private user: UserService
    ) {}

    /**
     * Удаляет группу полей из объекта
     * @param {Number} id идентификатор группы
     */
    delete(id: number): Observable<IGroup> {
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
     * Создает группу полей в объекте
     * @param {iGroup} group модель группы
     */
    create(group: IGroup): Observable<IGroup> {
        const headers = new Headers({ 'Content-Type': 'application/json' });

        if (this.user.isAuth()) {
            this.user.setAuthHeader(headers);
        }

        return this.http.post(
                        this.apiUrl,
                        JSON.stringify(group),
                        { headers: headers }
                    )
                    .map(r => this.response.parse(r))
                    .catch(this.error.handle);
    }
}
