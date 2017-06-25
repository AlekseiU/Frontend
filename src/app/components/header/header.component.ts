import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import {HelpComponent} from '../help/help.component';
import {ProfileComponent} from '../profile/profile.component';
import {SettingsComponent} from '../settings/settings.component';

@Component({
  	selector: 'ma-header',
  	templateUrl: './header.component.html',
  	styleUrls: ['./header.component.styl'],
  	providers: [
  		MdDialog
  	]
})
export class HeaderComponent implements OnInit {
	/****************************/
	/* Инициализация переменных */
	/****************************/
	visibility = true;
	
  	constructor(
  		public dialog: MdDialog
  	){}

  	/*********************/
	/* Методы компонента */
	/*********************/
	hide() {
		this.visibility = !this.visibility;
	}

	openHelp() {
	    let dialogRef = this.dialog.open(HelpComponent);
	    // dialogRef.afterClosed().subscribe(result => {
	    //   	console.log('1');
	    // });
	}	

	openProfile() {
	    let dialogRef = this.dialog.open(ProfileComponent);
	}	

	openSettings() {
	    let dialogRef = this.dialog.open(SettingsComponent);
	}	

  	/****************************/
	/* Инициализация компонента */
	/****************************/
	ngOnInit(){}
}
