import { Directive, AfterViewInit, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterViewInit {
  @Input('appAutoFocus') isFocused : boolean;
  constructor(private el: ElementRef) { };
  ngAfterViewInit(): void {
    console.log(`autoFocus isFocused : ${this.isFocused}`);
    if(this.isFocused){
      this.el.nativeElement.focus();
    }
  }

}