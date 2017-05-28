import { Directive, Input, ComponentRef, ViewContainerRef, ComponentFactoryResolver, HostListener } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';

import {DialogComponent} from './dialog.component';
import {DashboardComponent} from '../../components/dashboard/dashboard.component';

@Directive({
  	selector: '[maDialog]'
})
export class DialogDirective {
	private dialogComponent: ComponentRef<DialogComponent>;
	private visible: boolean = false;

    @Input()
    maDialog: any;

  	constructor(private router: Router,
                private route: ActivatedRoute,
                private viewContainerRef: ViewContainerRef, 
  				private resolver: ComponentFactoryResolver) {}

    @HostListener('click')
    toggleVisivility(): void {
        console.log(this.maDialog);
        console.log(this.route);

        if (!this.visible) {
            const dialogFactory = this.resolver.resolveComponentFactory(DialogComponent);
            const contentFactory = this.resolver.resolveComponentFactory(DashboardComponent);
            this.dialogComponent = this.viewContainerRef.createComponent(contentFactory); 
            // this.dialogComponent.instance.content = this.viewContainerRef.createComponent(contentFactory);
            // this.dialogComponent.instance.content = this.maDialog;
            this.dialogComponent.instance.hostElement = this.viewContainerRef.element.nativeElement;
            this.visible = true;           
        } else {
            if (this.dialogComponent) {
                this.dialogComponent.destroy();
            }
            this.visible = false;     
        }
    }
}
