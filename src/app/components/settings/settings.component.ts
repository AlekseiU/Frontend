import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
      selector: 'settings',
      templateUrl: './settings.component.html',
      styleUrls: ['./settings.component.styl']
})
export class SettingsComponent implements OnInit {

      constructor(public dialogRef: MdDialogRef<SettingsComponent>) { }

      ngOnInit() {}
}
