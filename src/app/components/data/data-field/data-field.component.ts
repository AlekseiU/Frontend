import { Component, OnInit, Input } from '@angular/core';
// Interfaces
import { IField } from '../../../interfaces/data/field/field';

@Component({
  selector: 'data-field',
  templateUrl: './data-field.component.html',
  styleUrls: ['./data-field.component.styl']
})
export class DataFieldComponent {
    /********************/
    /* Входные значения */
    /********************/
    @Input()
    field: IField;

    constructor() {}
}
