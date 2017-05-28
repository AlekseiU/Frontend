import { Component, AfterViewChecked, Input, ElementRef } from '@angular/core';


@Component({
  	selector: 'ma-tooltip',
  	template: '{{content}}',
  	styleUrls: ['./tooltip.component.styl']
})
export class TooltipComponent implements AfterViewChecked {
    private static ARROW_SIZE = 10;

    @Input() content: string;
    @Input() hostElement: HTMLElement;

    constructor(private element: ElementRef) {}

    ngAfterViewChecked() {
        const nativeElement = this.element.nativeElement;
        const hostRect = this.hostElement.getBoundingClientRect();
        const x = hostRect.right + TooltipComponent.ARROW_SIZE;
        const y = hostRect.top + 0.5 * (hostRect.height - nativeElement.clientHeight);
        nativeElement.style.left = x + 'px';
        nativeElement.style.top = y + 'px';
        nativeElement.style.visibility = 'visible';
    }
}