import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*********************/
/* Интерфейс сервиса */
/*********************/
interface IResponse {
    result: boolean;
    message: string;
    data: object;
}

@Injectable()
export class ResponseService {
    headers;
    status: number;
    body: IResponse;

    constructor() { }

    check(response): boolean {
        this.headers = response.headers;
        this.status = response.status;
        this.body = response.json();

        if (this.status !== 200) {
            return false;
        }

        if (this.body.result) {
            return this.body.result;
        } else {
            throw new Error(this.body.message);
        }
    }

    parse(response): object {
        if (this.check(response)) {
            return this.body.data;
        } else {
            throw new Error(this.body.message);
        }
    }
}
