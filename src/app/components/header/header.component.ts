import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
// Components
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
    visibility = true;

    constructor(
        public dialog: MdDialog
    ) {}

    /**
     * Прячет шапку
     */
    hide() {
        this.visibility = !this.visibility;
    }

    /**
     * Открывает модалку Help
     */
    openHelp() {
        const dialogRef = this.dialog.open(HelpComponent);
    }

    /**
     * Открывает модалку Profile
     */
    openProfile() {
        const dialogRef = this.dialog.open(ProfileComponent);
    }

    /**
     * Открывает модалку Settings
     */
    openSettings() {
        const dialogRef = this.dialog.open(SettingsComponent);
    }

    ngOnInit() {}
}
