import { Component, AfterViewChecked, Input, ElementRef } from '@angular/core';


@Component({
  	selector: 'ma-dialog',
    templateUrl: './dialog.component.html',
  	styleUrls: ['./dialog.component.styl']
})
export class DialogComponent implements AfterViewChecked {
    @Input() content: string;
    @Input() hostElement: HTMLElement;

    constructor(private element: ElementRef) {}

    ngAfterViewChecked() {
        const nativeElement = this.element.nativeElement;
        // const hostRect = this.hostElement.getBoundingClientRect();
        // const x = hostRect.right + TooltipComponent.ARROW_SIZE;
        // const y = hostRect.top + 0.5 * (hostRect.height - nativeElement.clientHeight);
        // nativeElement.style.left = x + 'px';
        // nativeElement.style.top = y + 'px';
        nativeElement.style.visibility = 'visible';
    }
}