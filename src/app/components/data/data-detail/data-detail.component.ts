import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';

import { DataService } from '../../../services/data/data.service';
import { DataComponent } from '../data.component';

@Component({
  	selector: 'ma-data-detail',
  	templateUrl: './data-detail.component.html',
  	styleUrls: ['./data-detail.component.styl'],
  	providers: [
		DataService
	]
})
export class DataDetailComponent implements OnInit {
	/********************/
	/* Входные значения */
	/********************/
	@Input()
	data: DataComponent;

	/****************************/
	/* Инициализация переменных */
	/****************************/
	showCreateList: boolean = false;	

	constructor(
		private dataService: DataService
	){}

	/*********************/
	/* Методы компонента */
	/*********************/
	updateData(data: DataComponent): void {
	    this.dataService.update(data)
	      	.subscribe(data => {
 	       		// this.data.push(data);
 	       		console.log(data);
 	     	});
	}

	approve() {
		this.data.fullScreen = false;
		this.updateData(this.data);
	}

	declane() {
		this.data.fullScreen = false;
	}

	addField() {
		console.log('add data field');
	}

	/****************************/
	/* Инициализация компонента */
	/****************************/
	ngOnChanges() {}

  	ngOnInit() {
  		this.data.coordinates.x = this.data.coordinates.x ? this.data.coordinates.x : (document.getElementsByClassName('dataList')[0].scrollWidth / 2) - 50;
  		this.data.coordinates.y = this.data.coordinates.y ? this.data.coordinates.y : (document.getElementsByClassName('dataList')[0].scrollHeight / 2) - 50;
  	}
}