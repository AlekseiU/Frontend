import { Component } from '@angular/core';

@Component({
    selector: 'data',
    templateUrl: './data.component.html',
    styleUrls: ['./data.component.styl']
})

export class DataComponent {
    /************************/
    /* Интерфейс компонента */
    /************************/
    id: number;
    name: string;
    coordinates: {
        x: number,
        y: number
    };
    fullScreen: boolean;
    project: number;
    parent: number;
    content: any;

    constructor(){}
}
