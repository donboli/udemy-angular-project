import { Directive, HostListener, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener('click') toggleOpen() {
    if (this.elRef.nativeElement.classList.contains('open')) {
      this.renderer.removeClass(this.elRef.nativeElement, 'open');
    } else {
      this.renderer.addClass(this.elRef.nativeElement, 'open');
    }
  }
}
