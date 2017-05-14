import { Component, OnInit } from '@angular/core';

@Component({
  	selector: 'ma-header',
  	templateUrl: './header.component.html',
  	styleUrls: ['./header.component.styl']
})
export class HeaderComponent implements OnInit {
	/****************************/
	/* Инициализация переменных */
	/****************************/
	visibility = true;
	
  	constructor(){}

  	/*********************/
	/* Методы компонента */
	/*********************/
	hide() {
		this.visibility = !this.visibility;
	}

  	/****************************/
	/* Инициализация компонента */
	/****************************/
	ngOnInit(){}
}
