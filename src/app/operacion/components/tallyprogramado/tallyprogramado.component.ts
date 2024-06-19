import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import { SharedService } from '../../../shared/services/shared.service';
import { catchError } from 'rxjs/operators';
import {Inventario } from '../../../inventario/model/inventario.model'
import { Pozo, Etapa } from '../../../catalogos/model/catalogos.model'
import { CatalogosService } from '../../../catalogos/services/catalogos.service';

@Component({
  selector: 'app-tallyprogramado',
  templateUrl: './tallyprogramado.component.html',
  styleUrl: './tallyprogramado.component.css'
})
export class TallyprogramadoComponent implements OnInit {
  pozo: Pozo[] = [];
  formtally!: FormGroup;
  etapa: Etapa[] = [];


  constructor(private formBuilder: FormBuilder
 
    , private sharedService: SharedService
    , private catalogos: CatalogosService
) 

{ }



ngOnInit(): void {

  this.formtally = this.formBuilder.group({
    pozo: ['', Validators.required],
    etapa:['', Validators.required],
  });


  this.getPozo();
  this.getEtapa();

  
}

getPozo() {
  this.catalogos.getCatPozo().pipe(
    catchError(error => {
      // Manejo del error
      console.log('Error en la solicitud objeto general:', error.error);
      alert( 'Error en la peticion de servicios APIs de Pozos');
      throw error; // Lanzar el error para que siga propagándose
    })
  ).subscribe(
    data => {
      this.pozo = data;
      console.log(this.pozo);
    }
  );
} 

getEtapa() {
  this.catalogos.getCatEtapa().pipe(
    catchError(error => {
      // Manejo del error
      console.log('Error en la solicitud objeto general:', error.error);
      alert( 'Error en la peticion de servicios APIs de Etapas');
      throw error; // Lanzar el error para que siga propagándose
    })
  ).subscribe(
    data => {
      this.etapa = data;
      console.log(this.etapa);
    }
  );
} 

}
