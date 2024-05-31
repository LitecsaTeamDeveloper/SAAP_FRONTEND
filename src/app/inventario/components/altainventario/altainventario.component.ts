import { Component, OnInit, EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DialogBoxService } from '../../../shared/services/dialog-box.service';
import { CatalogosService } from '../../../catalogos/services/catalogos.service';
import { catchError } from 'rxjs/operators';
import { regExps, errorMessages } from '../../../shared/validator';
import {NumeroParte, Diametros, Estatus,Grado,Rango, Conexion } from '../../../catalogos/model/catalogos.model'
import { SharedService } from '../../../shared/services/shared.service';
import { InventarioService } from '../../services/inventario.service';
import { ActualizacionTablaService } from '../../../shared/services/actualizaciontabla.service';


@Component({
  selector: 'app-altainventario',
  templateUrl: './altainventario.component.html',
  styleUrl: './altainventario.component.css'
})
export class AltainventarioComponent implements OnInit {
  esValido = true;
  formGroup!: FormGroup;
  numparte: NumeroParte[] = [];
  diametros: Diametros[] = [];

  estatus: Estatus[] = [];
  rango: Rango[] = [];
  grado: Grado[] = [];
  conexion: Conexion[] = [];
  isChecked = true;

  constructor(private formBuilder: FormBuilder, private dialogBoxService: DialogBoxService
              , private catalogos: CatalogosService, private sharedService: SharedService
              , private reginventario: InventarioService, private actualizacionTablaService: ActualizacionTablaService
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

      grado: ['', Validators.required],
      conexion: ['', Validators.required],
      libraje: ['', Validators.compose([
        Validators.required,
        Validators.pattern(regExps['numdecimal32']),
        Validators.maxLength(8)
      ])],
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
    //this.getUbicacion();
    this.getEstatus();
    this.getGrado();
    this.getRango();
    this.getConexion();

   }

  guardar() {
    // Lógica para guardar el formulario
if (this.validaFormulario()) {
    if (!(this.formGroup.get("esValido")?.value) && (this.getErrorMessageB("bending") || this.formGroup.get("bending")?.invalid) ) {
      alert("El valor de bending es incorrecto");
    } else {
      const datostubos = {
        "idInventario": this.sharedService.edicionInventario,
        "rfid": this.formGroup.get("rfid")?.value,
        "idNumeroParte": this.formGroup.get("numeroParte")?.value,
        "idCompania": this.sharedService.companiaUsuario,
        "descripcion": this.formGroup.get("descripcion")?.value,
        "idDiametroInterior": this.formGroup.get("diametroInterior")?.value,
        "idDiametroExterior": this.formGroup.get("diametroExterior")?.value,
        "longitud": this.formGroup.get("longitud")?.value,
        "idRango": this.formGroup.get("rango")?.value,
        "idGrado": this.formGroup.get("grado")?.value,
        "idConexion": this.formGroup.get("conexion")?.value,
        "libraje": this.formGroup.get("libraje")?.value,
        "esNuevo": this.formGroup.get("esValido")?.value,
        "bending": this.formGroup.get("esValido")?.value? 0: this.formGroup.get("bending")?.value===""? 0: this.formGroup.get("bending")?.value,
        "idEstatus": this.formGroup.get("estatus")?.value,
        "fechaIngreso": this.formGroup.get("fechaIngreso")?.value,
        "tipoRegistro": "N"
      }
      
      console.log('Esto es lo que se guarda en datos tubos: ',datostubos);
      this.guardaInventario(datostubos);
    }
  }
  else {
    alert ("Faltan datos requeridos u obligatorios");
  }
  }

  cerrar(): void {
    this.dialogBoxService.closeDialog();
  }

  getNumeroParte() {
    this.catalogos.getCatNumeroParte().pipe(
      catchError(error => {
        // Manejo del error
        console.log('Error en la solicitud objeto general:', error.error);
        alert( 'Error en la peticion de servicios APIs de Numero de parte');
        console.log('Error en la solicitud:', error.status);
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
    this.catalogos.getCatDiametros().pipe(
      catchError(error => {
        // Manejo del error
        console.log('Error en la solicitud objeto general:', error.error);
        alert( 'Error en la peticion de servicios APIs de Diametros');
        throw error; // Lanzar el error para que siga propagándose
      })
    ).subscribe(
      data => {
        this.diametros = data;
        console.log(this.diametros);
      }
    );
  }  


  getEstatus() {
    this.catalogos.getCatEstatus().pipe(
      catchError(error => {
        // Manejo del error
        console.log('Error en la solicitud objeto general:', error.error);
        alert( 'Error en la peticion de servicios APIs de Estatus');
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
    this.catalogos.getCatRango().pipe(
      catchError(error => {
        // Manejo del error
        console.log('Error en la solicitud objeto general:', error.error);
        alert( 'Error en la peticion de servicios APIs de Rangos');
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
    this.catalogos.getCatGrado().pipe(
      catchError(error => {
        // Manejo del error
        console.log('Error en la solicitud objeto general:', error.error);
        alert( 'Error en la peticion de servicios APIs de Grado');
        throw error; // Lanzar el error para que siga propagándose
      })
    ).subscribe(
      data => {
        this.grado = data;
        console.log(this.grado);
      }
    );
  } 
  
  getConexion() {
    this.catalogos.getCatConexion().pipe(
      catchError(error => {
        // Manejo del error
        console.log('Error en la solicitud objeto general:', error.error);
        alert( 'Error en la peticion de servicios APIs de Conexion');
        throw error; // Lanzar el error para que siga propagándose
      })
    ).subscribe(
      data => {
        this.conexion = data;
        console.log(this.conexion);
      }
    );
  }    

  onSlideToggleChange(event: any) {
    this.esValido = event.checked;
    console.log('valor del toggle: ', this.esValido)
    this.formGroup.patchValue({
      esValido: this.esValido
    });
    // console.log('evento change toggle: ', event)
    // this.esValido = event.checked;
    // console.log('valor del toggle: ', this.esValido)
    // this.formGroup.patchValue({
    //   esValido: this.esValido
    // });
  }

  getErrorMessage(controlName: string): string {
    const control: any = this.formGroup.get(controlName);

    if (control.hasError('pattern')) {
      return errorMessages[controlName];
    }
    return '';
  }

  // guardaInventario(datos: any) {
  //   this.reginventario.regInventario(datos).pipe(
  //     catchError(error => {
  //       // Manejo del error
  //       console.log('Error en la solicitud objeto general:', error.error);
  //       alert( error.text);
  //       throw error; // Lanzar el error para que siga propagándose
  //     })
  //   ).subscribe(
  //     data => {
  //       console.log(data);
  //     }
  //   );
  // } 
  
  guardaInventario(datos: any) {
    this.reginventario.regInventario(datos).subscribe(
      data => {
        console.log(data); // Manejo exitoso de la respuesta
        this.dialogBoxService.closeDialog();
        this.actualizacionTablaService.notificarDialogCerrado();
      },
      error => {
        console.log('Error en la solicitud:', error);
        alert('Error en la solicitud. Consulta la consola para más detalles.');
      }
    );
  }

  getErrorMessageB(controlName: string): boolean {
    const control: any = this.formGroup.get(controlName);
    let retorno: boolean = true;
    if (control.hasError('pattern')) {
      return retorno = true;
    }
    return retorno = false;
  }

  validaFormulario(): boolean {

    if (this.formGroup.get("rfid")?.invalid ||
    this.formGroup.get("numeroParte")?.invalid ||
    this.formGroup.get("descripcion")?.invalid ||
    this.formGroup.get("diametroInterior")?.invalid ||
    this.formGroup.get("diametroExterior")?.invalid ||
    this.formGroup.get("longitud")?.invalid ||
    this.formGroup.get("rango")?.invalid ||
    this.formGroup.get("grado")?.invalid ||
    this.formGroup.get("conexion")?.invalid ||
    this.formGroup.get("libraje")?.invalid ||
    this.formGroup.get("estatus")?.invalid ||
    this.formGroup.get("fechaIngreso")?.invalid
  ) {
      return false;
  } else 
   {
      return true;
   }

  }

}