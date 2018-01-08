import { Component, OnInit, HostBinding } from '@angular/core';
// Providers
import {UserService} from '../../services/providers/user/user.service';

@Component({
      selector: 'ma-footer',
      templateUrl: './footer.component.html',
      styleUrls: ['./footer.component.styl'],
})
export class FooterComponent {
    @HostBinding('class.visible') visibility: boolean;

    constructor(
        private userService: UserService,
    ) {}

    /**
     * Переключает видимость компонента
     */
    toggleVisibility() {
        this.visibility = !this.visibility;
    }
}
