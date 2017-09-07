import { Injectable } from '@angular/core';
// Libraries
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ErrorService {

    constructor() {}

    /**
    * Обрабатывает ошибки
    * @param {Any} error Ошибка
    * @param {Object} caught Обработчик вызова
    */
    handle(error: any, caught: Observable<Object>) {
        console.error('An error occurred', error); // Режим отладки
        return Observable.throw(error.message || error);
    }
}
