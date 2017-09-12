import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
      selector: 'range',
      templateUrl: './range.component.html',
      styleUrls: ['./range.component.styl']
})
export class RangeComponent {
    @Input() value;
    @Input() min;
    @Input() max;
    @Input() step;

    @Output() scale = new EventEmitter();

    constructor() {}

    /**
     * Изменяет значение бегунка
     */
    change() {
        this.scale.emit(this.value);
    }
}
