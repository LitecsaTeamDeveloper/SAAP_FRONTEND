import { Component, OnInit, EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DialogBoxService } from '../../../shared/services/dialog-box.service';
import { CatalogosService } from '../../../catalogos/services/catalogos.service';
import { catchError, map } from 'rxjs/operators';
import { regExps, errorMessages } from '../../../shared/validator';
import {NumeroParte, Diametros, Estatus,Grado,Rango, Conexion } from '../../../catalogos/model/catalogos.model'
import { SharedService } from '../../../shared/services/shared.service';
import { InventarioService } from '../../services/inventario.service';
import { ActualizacionTablaService } from '../../../shared/services/actualizaciontabla.service';
import { Observable, of } from 'rxjs';


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
  valDi: any = 0;
  valDe: any = 0;
  esValidoRfid: boolean = true;
  valRfid: string = '';
  fechaLimite = new Date();

  constructor(private formBuilder: FormBuilder, private dialogBoxService: DialogBoxService
              , private catalogos: CatalogosService, private sharedService: SharedService
              , private reginventario: InventarioService, private actualizacionTablaService: ActualizacionTablaService
  ) {
    this.fechaLimite.setDate(this.fechaLimite.getDate() + 1);
   }

  ngOnInit() {

    console.log('ide compania con localstorage: ', localStorage.getItem('IdCompany'));
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

    if (this.valDe > 0 && this.valDi > 0) {
      if (this.valDi >= this.valDe) {
          console.log("El diametro interior debe ser menor al diametro mayor")
          alert('El diametro interior debe ser menor al diametro mayor');
        return;
      }
    } 

    if (!(this.formGroup.get("esValido")?.value) && (this.getErrorMessageB("bending") || this.formGroup.get("bending")?.invalid) ) {
      alert("El valor de bending es incorrecto");
    } else {
      const datostubos = {
        "idInventario": 0,
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
    this.reginventario.regInventario(datos).pipe(
      catchError(error => {
        console.log('Error en la solicitud:', error);
        alert('Error en el registro del tramo. Consulta la consola para más detalles.');
        throw error; // Lanzar el error para que siga propagándose
      })
    ).subscribe(
      data => {
        console.log(data); // Manejo exitoso de la respuesta
        alert('Tramo registrado con Éxito');
        this.dialogBoxService.closeDialog();
        this.actualizacionTablaService.notificarDialogCerrado();
      }
    );    
    // this.reginventario.regInventario(datos).subscribe(
    //   data => {
    //     console.log(data); // Manejo exitoso de la respuesta
    //     alert('Registro de tramo existoso');
    //     this.dialogBoxService.closeDialog();
    //     this.actualizacionTablaService.notificarDialogCerrado();
    //   },
    //   error => {
    //     console.log('Error en la solicitud:', error);
    //     alert('Error en la solicitud. Consulta la consola para más detalles.');
    //   }
    // );
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
    if (this.formGroup.get("rfid")?.value != '') {
        this.validaRfid2(this.formGroup.get("rfid")?.value);
          if (!this.esValidoRfid) {
            alert ('El RFID ya existe en el inventario, asigne un valor valido');
            return false;
          } 
    }

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

  valDiaInterior(selectedValue: any) {
    const selectedFraccionExterior = this.diametros.find(diametro => diametro.id === selectedValue);

    console.log('valor de la descripcion del select de diametro: ',selectedFraccionExterior?.diametroFraccion);

    const valor: any = selectedFraccionExterior?.diametroFraccion;

    console.log('diametroexterior: ', this.convertirAFraccion(valor));
    this.valDi = this.convertirAFraccion(valor);

    if (this.valDe > 0 && this.valDi > 0) {
      if (this.valDi >= this.valDe) {
          console.log("El diametro interior debe ser menor al diametro mayor")
          alert('El diametro interior debe ser menor al diametro mayor');
      }
  } 
  } 

  valDiaExterior(selectedValue: any) {
    const selectedFraccionExterior = this.diametros.find(diametro => diametro.id === selectedValue);

    console.log('valor id del select de diametro: ',selectedValue);
    console.log('valor de la descripcion del select de diametro: ',selectedFraccionExterior?.diametroFraccion);
    const valor: any = selectedFraccionExterior?.diametroFraccion;

    console.log('diametroexterior: ', this.convertirAFraccion(valor));

    this.valDe = this.convertirAFraccion(valor);

    if (this.valDe > 0 && this.valDi > 0) {
        if (this.valDi >= this.valDe) {
            console.log("El diametro interior debe ser menor al diametro mayor")
            alert('El diametro interior debe ser menor al diametro mayor');
           
        }
    } 

  }  

  convertirAFraccion(cadena: string): number {
    const partes = cadena.split(" ");
    if (partes.length !== 2 || !partes[1].includes("/")) {
       return parseInt(cadena);
    }

    // const partes = cadena.split(" ");
    const entero = parseInt(partes[0]);
    const fraccionPartes = partes[1].split("/");
    const numerador = parseInt(fraccionPartes[0]);
    const denominador = parseInt(fraccionPartes[1]);
  
    return entero + numerador / denominador;
  }


esRfidValido(event: Event): Observable<boolean> {

 const rfidInput = event.target as HTMLInputElement;
 const rfidValue = rfidInput.value;
 if (rfidValue !== '') {
  return this.reginventario.validaRfid(rfidValue).pipe(
    catchError(error => {
      console.log('Error en la solicitud objeto general:', error.error);
      alert('Error en la petición de servicios APIs');
      throw error;
    }),
    map(data => {
      const valido = data;
      console.log('valor de valido:', valido);
      if (!valido) {
        console.log('entro en el if no válido');
        return false;
      } else {
        console.log('entro en el if válido');
        return true;
      }
    })
  );
} else {

  return of(false);
}
  }

validaRfid(event: Event) {
  const rfidInput = event.target as HTMLInputElement;
  const rfidValue = rfidInput.value;
  this.valRfid = rfidValue;
  this.esRfidValido(event).subscribe(result => {
    this.esValidoRfid = result;
    if (this.valRfid != '') {
      if (!this.esValidoRfid) {
        alert ('El RFID ya existe en el inventario, asigne un valor valido');
      }
    } else {
      this.valRfid = '';
    }

  });
}

esRfidValido2(rfid: string): Observable<boolean> {
  const rfidValue = rfid;
  if (rfidValue !== '') {
   return this.reginventario.validaRfid(rfidValue).pipe(
     catchError(error => {
       console.log('Error en la solicitud objeto general:', error.error);
       alert('Error en la petición de servicios APIs');
       throw error;
     }),
     map(data => {
       const valido = data;
       console.log('valor de valido:', valido);
       if (!valido) {
         console.log('entro en el if no válido');
         return false;
       } else {
         console.log('entro en el if válido');
         return true;
       }
     })
   );
 } else {
 
   return of(false);
 }
   }
 
 validaRfid2(rfid: string) {

   this.valRfid = rfid;
   this.esRfidValido2(rfid).subscribe(result => {
     this.esValidoRfid = result;

 
   });
 }
 


}