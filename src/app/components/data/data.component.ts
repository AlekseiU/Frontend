import { Component } from '@angular/core';

@Component({
	selector: 'ma-data',
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
	// content: [{
	// 	name: string,
	// 	order: number,
	// 	fields: [{
	// 		type: string,
	// 		value: any,
	// 		order: number
	// 	}]
	// }];

	constructor(){}
}
