import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  	selector: 'ma-range',
  	templateUrl: './range.component.html',
  	styleUrls: ['./range.component.styl']
})
export class RangeComponent {
	/********************/
	/* Входные значения */
	/********************/
	@Input() value;
	@Input() min;
	@Input() max;
	@Input() step;

	/*********************/
	/* Выходные значения */
	/*********************/
	@Output() scale = new EventEmitter();

  	constructor() {}

  	change() {
  		this.scale.emit(this.value);
  	}
}
