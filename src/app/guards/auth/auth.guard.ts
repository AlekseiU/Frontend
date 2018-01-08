import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';
// Components
import {LoginDialogComponent} from '../../dialogs/login/login.component';
// Providers
import { UserService } from '../../services/providers/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private user: UserService, 
        private router: Router,
        private dialog: MdDialog
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (this.user.isAuth()) {
            return true;
        } else {
            this.router.navigate(['/'], {
                queryParams: {
                    returnUrl: state.url
                }
            });
            this.dialog.open(LoginDialogComponent);
            return false;
        }
    }
}
