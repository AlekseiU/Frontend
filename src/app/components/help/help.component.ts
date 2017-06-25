import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  	selector: 'help',
  	templateUrl: './help.component.html',
  	styleUrls: ['./help.component.styl']
})
export class HelpComponent implements OnInit {

  	constructor(public dialogRef: MdDialogRef<HelpComponent>) { }

  	ngOnInit() {}
}
