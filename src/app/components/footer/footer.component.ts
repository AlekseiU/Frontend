import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
      selector: 'ma-footer',
      templateUrl: './footer.component.html',
      styleUrls: ['./footer.component.styl']
})
export class FooterComponent implements OnInit {
    @HostBinding('class.visible') visibility: boolean;

    constructor(){}

    /**
     * Переключает видимость компонента
     */
    toggleVisibility() {
        this.visibility = !this.visibility;
    }

    ngOnInit() {}
}
