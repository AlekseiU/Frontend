import { NgForm, EmailValidator, MinLengthValidator } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
// Components
import { RegistrationDialogComponent } from '../registration/registration.component';
// Services
import { UserService } from '../../services/providers/user/user.service';
// Interfaces
import { IUser } from '../../interfaces/user/user';

@Component({
    selector: 'ma-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.styl'],
})
export class LoginDialogComponent {
    constructor(
        private userService: UserService,
        private dialog: MdDialog,
        private dialogRef: MdDialogRef<LoginDialogComponent>,
        private router: Router,
        private activeRoute: ActivatedRoute
    ) {}

    close() {
        this.dialogRef.close();
    }

    register() {
        this.dialogRef.close();
        this.dialog.open(RegistrationDialogComponent);
    }

    login(form: NgForm) {
        if (!form.valid) {
            return;
        }

        const user: IUser = {
            email: form.value.email,
            password: form.value.password
        }

        this.userService.login(user)
            .subscribe(response => {
                this.activeRoute.queryParams
                    .subscribe(params => {
                        if (params.returnUrl) {
                            this.router.navigate([(params.returnUrl)]);
                        } else {
                            this.router.navigate(['/dashboard']);
                        }
                    });
                this.close();
            });
    }
}
