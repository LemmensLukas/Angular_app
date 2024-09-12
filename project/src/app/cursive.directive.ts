import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appCursive]'
})
export class CursiveDirective implements OnInit{

  constructor(private ref: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.setStyle( this.ref.nativeElement, 'font-style', 'italic');
  }

}
