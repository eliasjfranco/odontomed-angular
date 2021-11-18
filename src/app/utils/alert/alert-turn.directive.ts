import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[alertTurn]'
})
export class AlertTurnDirective {

  constructor( public viewContainerRef : ViewContainerRef) { }

}
