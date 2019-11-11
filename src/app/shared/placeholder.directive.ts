import { ViewContainerRef, Directive } from '@angular/core';

@Directive({
    selector: '[apphost]'
})

export class PlaceholderDirective {
    constructor(public viewContRef: ViewContainerRef) {}
}