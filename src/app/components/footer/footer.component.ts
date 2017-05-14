import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  	selector: 'ma-footer',
  	templateUrl: './footer.component.html',
  	styleUrls: ['./footer.component.styl']
})
export class FooterComponent implements OnInit {
	/****************************/
	/* Инициализация переменных */
	/****************************/
	// visibility: boolean = false;

	/***********************/
	/* Обработчики событий */
	/***********************/
	@HostBinding('class.visible') visibility: boolean = false;

  	constructor(){}
	/*********************/
	/* Методы компонента */
	/*********************/
	toggleVisibility() {
		this.visibility = !this.visibility;
	}

  	/****************************/
	/* Инициализация компонента */
	/****************************/
  	ngOnInit() {}
}
