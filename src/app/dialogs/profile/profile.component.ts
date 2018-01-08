import { NgForm, EmailValidator, MinLengthValidator } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
// Components
import { LoginDialogComponent } from '../login/login.component';
// Services
import { UserService } from '../../services/providers/user/user.service';
// Interfaces
import { IUser } from '../../interfaces/user/user';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.styl'],
})
export class ProfileDialogComponent {
    constructor(
        private userService: UserService,
        private dialog: MdDialog,
        private dialogRef: MdDialogRef<ProfileDialogComponent>
    ) {}

    close() {
        this.dialogRef.close();
    }

    logout() {
        this.userService.logout();
        this.close();
    }

    register(form: NgForm) {
        // if (form.value.password !== form.value.passwordConfirm) {
        //     form.form.controls['passwordConfirm'].setErrors({'incorrect': true});
        //     return;
        // }

        // if (!form.valid) {
        //     return;
        // }

        // const user: IUser = {
        //     email: form.value.email,
        //     password: form.value.password
        // }

        // this.userService.register(user)
        //     .subscribe(response => {
        //         this.close();
        //         // console.log(response);
        //         // this.userService.accessToken = response.token;
        //         // this.localStorage.setItem('accessToken', response.token);
        //     });
    }
}
