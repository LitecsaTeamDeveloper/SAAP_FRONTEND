import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DialogBoxService } from '../../../shared/services/dialog-box.service';
import { CatalogosService } from '../../../catalogos/services/catalogos.service';
import { catchError } from 'rxjs/operators';
import { regExps, errorMessages } from '../../../shared/validator';
import {NumeroParte, Diametros, Estatus,Grado,Rango,Ubicacion } from '../../../catalogos/model/catalogos.model'
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-editainventario',
  templateUrl: './editainventario.component.html',
  styleUrl: './editainventario.component.css'
})
export class EditainventarioComponent implements OnInit {
  esValido = true;
  formGroup!: FormGroup;
  numparte: NumeroParte[] = [];
  diametros: Diametros[] = [];
  ubicacion: Ubicacion[] = [];
  estatus: Estatus[] = [];
  rango: Rango[] = [];
  grado: Grado[] = [];
  isChecked = true;

  constructor(private formBuilder: FormBuilder, private dialogBoxService: DialogBoxService
              , private catNumeroParte: CatalogosService
              , private _snackBar: MatSnackBar, private sharedService:SharedService
  ) { }

  ngOnInit() {
 
    this.formGroup = this.formBuilder.group({
      numeroParte: ['', Validators.required],
      rfid: ['', Validators.required],
      descripcion: ['', Validators.required],
      diametroInterior: ['', Validators.required],
      diametroExterior: ['', Validators.required],
      longitud: ['', Validators.compose([
        Validators.required,
        Validators.pattern(regExps['numdecimales']),
        Validators.maxLength(8)
      ])],
      estatus: ['', Validators.required],
      ubicacion: ['', Validators.required],
      grado: ['', Validators.required],
      rango: ['', Validators.required],
      fechaIngreso: ['', Validators.required],
      esValido: [this.esValido],
      bending: ['', Validators.compose([
        Validators.required,
        Validators.pattern(regExps['numdecimales']),
        Validators.maxLength(8)
      ])],
    });

    //Lista de catalogos
    this.getNumeroParte();
    this.getDiametros();
    this.getUbicacion();
    this.getEstatus();
    this.getGrado();
    this.getRango();
    console.log('idiventario edicion: ', this.sharedService.edicionInventario.toString());
  }

  guardar() {
    // Lógica para guardar el formulario
    console.log('Esto es lo que se guarda: ',this.formGroup.value);

  }

  cerrar(): void {
    this.dialogBoxService.closeDialog();
  }

  getNumeroParte() {
    this.catNumeroParte.getCatNumeroParte().pipe(
      catchError(error => {
        // Manejo del error
        if (error.status == 0) {

          alert( 'Error en la peticion de servicios APIs');
          // this._snackBar.open( 'Error en la peticion de servicios APIs','SAAP',{
          //   duration:2500,
          //   horizontalPosition: 'center',
          //   verticalPosition: 'top'
          // })
        } else {

          alert( error.error);
          // this._snackBar.open( error.error,'SAAP',{
          //   duration:2500,
          //   horizontalPosition: 'center',
          //   verticalPosition: 'top'
          // })
        }
        throw error; // Lanzar el error para que siga propagándose
      })
    ).subscribe(
      data => {
        this.numparte = data;
        console.log(this.numparte);
      }
    );
  }  

  getDiametros() {
    this.catNumeroParte.getCatDiametros().pipe(
      catchError(error => {
        // Manejo del error
        if (error.status == 0) {

          alert( 'Error en la peticion de servicios APIs');
        } else {

          alert( error.error);
        }
        throw error; // Lanzar el error para que siga propagándose
      })
    ).subscribe(
      data => {
        this.diametros = data;
        console.log(this.diametros);
      }
    );
  }  

  getUbicacion() {
    this.catNumeroParte.getCatUbicacion().pipe(
      catchError(error => {
        // Manejo del error
        if (error.status == 0) {

          alert( 'Error en la peticion de servicios APIs');
        } else {

          alert( error.error);
        }
        throw error; // Lanzar el error para que siga propagándose
      })
    ).subscribe(
      data => {
        this.ubicacion = data;
        console.log(this.ubicacion);
      }
    );
  }  

  getEstatus() {
    this.catNumeroParte.getCatEstatus().pipe(
      catchError(error => {
        // Manejo del error
        if (error.status == 0) {

          alert( 'Error en la peticion de servicios APIs');
        } else {

          alert( error.error);
        }
        throw error; // Lanzar el error para que siga propagándose
      })
    ).subscribe(
      data => {
        this.estatus = data;
        console.log(this.estatus);
      }
    );
  } 

  getRango() {
    this.catNumeroParte.getCatRango().pipe(
      catchError(error => {
        // Manejo del error
        if (error.status == 0) {

          alert( 'Error en la peticion de servicios APIs');
        } else {

          alert( error.error);
        }
        throw error; // Lanzar el error para que siga propagándose
      })
    ).subscribe(
      data => {
        this.rango = data;
        console.log(this.rango);
      }
    );
  }    


  getGrado() {
    this.catNumeroParte.getCatGrado().pipe(
      catchError(error => {
        // Manejo del error
        if (error.status == 0) {

          alert( 'Error en la peticion de servicios APIs');
        } else {

          alert( error.error);
        }
        throw error; // Lanzar el error para que siga propagándose
      })
    ).subscribe(
      data => {
        this.grado = data;
        console.log(this.grado);
      }
    );
  }    

  onSlideToggleChange(event: any) {
    this.esValido = event.checked;
    console.log('valor del toggle: ', this.esValido)
    this.formGroup.patchValue({
      esValido: this.esValido
    });

  }

  getErrorMessage(controlName: string): string {
    const control: any = this.formGroup.get(controlName);

    if (control.hasError('pattern')) {
      return errorMessages[controlName];
    }
    return '';
  }
 
}