import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ma-data-field',
  templateUrl: './data-field.component.html',
  styleUrls: ['./data-field.component.styl']
})
export class DataFieldComponent implements OnInit {
	/********************/
	/* Входные значения */
	/********************/
	@Input()
    field;

    /****************************/
	/* Инициализация переменных */
	/****************************/
	draggableField = null;

	constructor() {}

	/*********************/
	/* Методы компонента */
	/*********************/
	deleteField(groupId: number, fieldId: number) {
		// delete this.data.content[groupId].fields[fieldId];
	}

	fieldOrderUp(groupId: number, fieldId: number) {
		// if (this.data.content[groupId].fields[fieldId-1]) {
		// 	this.data.content[groupId].fields[fieldId].order = this.data.content[groupId].fields[fieldId-1].order - 1;
		// }
	}

	fieldOrderDown(groupId: number, fieldId: number) {
		// if (this.data.content[groupId].fields[fieldId+1]) {
		// 	this.data.content[groupId].fields[fieldId].order = this.data.content[groupId].fields[fieldId+1].order + 1;
		// }		
	}

	dragField(event, field) {
		// console.log(event, field);
		// if (!this.draggableField) {
		// 	event.preventDefault();
		// 	this.draggableField = field;
		// }
	}

	swapFieldOrder(event, field) {
		// if (this.draggableField) {
		// 	event.preventDefault();
		// 	if (this.draggableField.order === field.order) {
		// 		this.draggableField.order++;
		// 	} else {
		// 		let temp = this.draggableField.order;
		// 		this.draggableField.order = field.order;
		// 		field.order = temp;
		// 	}
			
		// }
	}	

  	ngOnInit() {}
}
