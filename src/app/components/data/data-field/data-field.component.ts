import { Component, OnInit, Input } from '@angular/core';

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
    field;

	constructor() {}
}
