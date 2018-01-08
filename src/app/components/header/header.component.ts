import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
// Components
import {ProfileDialogComponent} from '../../dialogs/profile/profile.component';
import {LoginDialogComponent} from '../../dialogs/login/login.component';
import {RegistrationDialogComponent} from '../../dialogs/registration/registration.component';
// Providers
import {UserService} from '../../services/providers/user/user.service';

@Component({
    selector: 'ma-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.styl'],
    providers: [
        MdDialog
    ]
})
export class HeaderComponent {
    constructor(
        private dialog: MdDialog,
        private userService: UserService,
    ) {}

    /**
     * Открывает модалку Profile
     */
    profile() {
        this.dialog.open(ProfileDialogComponent);
    }

    /**
     * Открывает модалку Login
     */
    login() {
        this.dialog.open(LoginDialogComponent);
    }
}
