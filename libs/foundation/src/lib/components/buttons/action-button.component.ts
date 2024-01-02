import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'foundation-action-button',
  encapsulation: ViewEncapsulation.None,
  template: `
    <button
        [type]="type"
        (click)="handleClick()"
        [disabled]="disabled"
        [title]="description ? description : label"
        [ngClass]="{
        'bg-gray-500 ring-gray-600': color === 'default',
        'bg-green-500 ring-green-600': color === 'green',
        'bg-red-500 ring-red-600': color === 'red',
        'bg-yellow-500 ring-yellow-600': color === 'yellow',
        'bg-blue-500 ring-blue-600': color === 'blue',
        'w-full btn-block': block
        }"
        class="
        fill-white  text-white
          transition-all duration-200
          ring-0 hover:ring-1
          drop-shadow-md hover:drop-shadow-lg
          flex items-center justify-center
          p-2 space-x-3
          ms-2 me-2
          text-xs
          disabled:opacity-50 disabled:cursor-not-allowed
        ">
        <foundation-icon
        forcedClass="w-4 h-4"
        *ngIf="icon"
        [icon]="icon"/>
        <span
        class="empty:hidden hidden md:block"
        >
          {{label}}
        </span>
      </button>
  `,
  styles: `
    *:has(>.btn-block){
      width: 100%;
    }
  `,
})
export class ActionButtonComponent {
  @Input() color: 'green' | 'red' | 'yellow' | 'blue' | 'default' = 'default'
  @Input() type: 'button' | 'submit' | 'reset' = 'button'
  @Input() disabled: boolean | undefined
  @Input() icon: string | undefined
  @Input({required:true}) label: string | undefined
  @Input() description: string | undefined
  @Input() block: boolean | undefined

  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  handleClick() {
    if(this.disabled) return

    if(!this.buttonClick.observed)
      throw new Error('No buttonClick event listener found')
    this.buttonClick.emit();
  }
}
