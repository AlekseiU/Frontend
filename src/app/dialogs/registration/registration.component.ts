import { NgForm, EmailValidator, MinLengthValidator } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
// Components
import { LoginDialogComponent } from '../login/login.component';
// Services
import { UserService } from '../../providers/user/user.service';
// Interfaces
import { IUser } from '../../interfaces/user/user';

@Component({
    selector: 'ma-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.styl'],
})
export class RegistrationDialogComponent {
    constructor(
        private userService: UserService,
        private dialog: MdDialog,
        private dialogRef: MdDialogRef<RegistrationDialogComponent>
    ) {}

    close() {
        this.dialogRef.close();
    }

    login() {
        this.dialogRef.close();
        this.dialog.open(LoginDialogComponent);
    }

    register(form: NgForm) {
        if (form.value.password !== form.value.passwordConfirm) {
            form.form.controls['passwordConfirm'].setErrors({'incorrect': true});
            return;
        }

        if (!form.valid) {
            return;
        }

        const user: IUser = {
            email: form.value.email,
            password: form.value.password
        }

        this.userService.register(user)
            .subscribe(response => {
                this.close();
            });
    }
}
