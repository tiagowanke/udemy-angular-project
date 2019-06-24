import {Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[udemyProjectMyDirective]'
})
export class MyDirectiveDirective implements OnInit {

  @Input() defaultColor = 'transparent';
  @Input('udemyProjectMyDirective') highlightColor = 'grey';
  @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor(private renderer: Renderer2,
              private elRef: ElementRef) { }

  ngOnInit(): void {
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') mouseOver(eventDate: Event): void {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'grey');
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseLeave(eventDate: Event): void {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = this.defaultColor;
  }
}
