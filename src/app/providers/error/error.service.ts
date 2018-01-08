import { Injectable } from '@angular/core';
// Libraries
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ErrorService {

    constructor() {}

    /**
    * Обрабатывает ошибки
    * @param {Any} error Ошибка
    */
    handle(error: any) {
        console.error('An error occurred', error); // Режим отладки
        return Observable.throw(error.message || error);
    }
}
