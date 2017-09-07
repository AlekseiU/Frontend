import { Component } from '@angular/core';
// Interfaces
import { IData } from '../../interfaces/data/data';

@Component({
    selector: 'data',
})

export class DataComponent implements IData{
    id;
    name;
    coordinates;
    fullScreen;
    project;
    parent;
    content;
}
