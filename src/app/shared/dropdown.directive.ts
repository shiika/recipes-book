import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') private open: boolean = false;

  @HostListener('document:click', ['$event']) onClicks() {
    // this.open = !this.open;
    this.open = this.elRef.nativeElement.contains(event.target) ? !this.open : false;
    console.dir(event);
  }

  // ngOnInit() {
  //   let docClick = (e) => {
  //     // console.log(e);
  //     if (e.target.classList.value !== "dropdown-toggle" && this.open == true) {
  //       this.onClicks()
  //     }
  //   }
  //   document.addEventListener("click", docClick);
  // }

  constructor(private elRef: ElementRef) { }

}
