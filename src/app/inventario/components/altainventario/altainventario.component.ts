import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-altainventario',
  templateUrl: './altainventario.component.html',
  styleUrl: './altainventario.component.css'
})
export class AltainventarioComponent implements OnInit {
  formGroup!: FormGroup;

  partes: string[] = ['Parte 1', 'Parte 2', 'Parte 3'];
  diametrosInteriores: number[] = [10, 15, 20];
  diametrosExteriores: number[] = [25, 30, 35];
  estatusOpciones: string[] = ['Activo', 'Inactivo', 'Pendiente'];
  ubicacionesOpciones: string[] = ['Ubicación A', 'Ubicación B', 'Ubicación C'];
  gradosOpciones: string[] = ['Grado 1', 'Grado 2', 'Grado 3'];
  rangosOpciones: string[] = ['Rango A', 'Rango B', 'Rango C'];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      numeroParte: [''],
      rfid: [''],
      descripcion: [''],
      diametroInterior: [''],
      diametroExterior: [''],
      longitud: [''],
      estatus: [''],
      ubicacion: [''],
      grado: [''],
      rango: [''],
      fechaIngreso: [''],
      esValido: [false]
    });
  }

  guardar() {
    // Lógica para guardar el formulario
    console.log(this.formGroup.value);
  }

  cerrar() {
    // Lógica para cerrar el formulario
  }
}