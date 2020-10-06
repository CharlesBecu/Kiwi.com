import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appSearchJob]',
})

export class SearchJobDirective {

  constructor() {
      // initilization
  }

  // @HostListener('submit') onSubmit(event): void {
  //   alert('yo');
  // }
}
