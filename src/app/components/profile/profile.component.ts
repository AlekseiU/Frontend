import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.styl']
})
export class ProfileComponent implements OnInit {

    constructor(public dialogRef: MdDialogRef<ProfileComponent>) { }

    ngOnInit() {}
}
