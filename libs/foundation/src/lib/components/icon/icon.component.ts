import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'foundation-icon',
  template: `<div [innerHTML]="sanitizedSvg"></div>`,
})
export class IconComponent implements OnInit{
  @Input({required: false})
  forcedClass = 'w-6 h-6'

  @Input({required: true})
  icon:string = ''

  sanitizedSvg: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    const svgWithClass = this.icon?.replace('<svg', `<svg class="${this.forcedClass}"`).replace("style=\"width:var(--ng-icon__size, 1em);height:var(--ng-icon__size, 1em)\"","")
    this.sanitizedSvg = this.sanitizer.bypassSecurityTrustHtml(svgWithClass ?? '');
  }

}
