import { Directive, Input, ComponentRef, ViewContainerRef, ComponentFactoryResolver, HostListener } from '@angular/core';

import {TooltipComponent} from './tooltip.component';

@Directive({
  	selector: '[maTooltip]'
})
export class TooltipDirective {
	private tooltipComponent: ComponentRef<TooltipComponent>;
	private visible: boolean;

    @Input()
    maTooltip: string;

  	constructor(private viewContainerRef: ViewContainerRef, 
  				private resolver: ComponentFactoryResolver) {}

    @HostListener('focusin')
    @HostListener('mouseenter')
    show(): void {
        if (!this.visible) {
            const factory = this.resolver.resolveComponentFactory(TooltipComponent);
            this.tooltipComponent = this.viewContainerRef.createComponent(factory);
            this.tooltipComponent.instance.content = this.maTooltip as string;
            this.tooltipComponent.instance.hostElement = this.viewContainerRef.element.nativeElement;
            this.visible = true;
        }
    }

    @HostListener('focusout')
    @HostListener('mouseleave')
    hide(): void {
        if (this.visible) {
            if (this.tooltipComponent) {
                this.tooltipComponent.destroy();
            }
            this.visible = false;
        }
    }

}
