import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, ChangeDetectorRef  } from '@angular/core';

@Component({
  selector: 'app-operacion',
  templateUrl: './operacion.component.html',
  styleUrl: './operacion.component.css'
})
export class OperacionComponent   {

  isEditable = true;
  currentStepIndex = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  cambiarPaso(event: StepperSelectionEvent) {
    this.currentStepIndex = event.selectedIndex;
    this.cdr.detectChanges();
    console.log(this.currentStepIndex);
  }
}