import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AlertService } from '../../../shared/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../../../shared/component/dialog-box/dialog-box.component';
import { InventarioService } from '../../../inventario/services/inventario.service';
import { SharedService } from '../../../shared/services/shared.service';
import { catchError } from 'rxjs/operators';
import {Inventario } from '../../../inventario/model/inventario.model'
import {Ubicacion, Pozo } from '../../../catalogos/model/catalogos.model'
import { CatalogosService } from '../../../catalogos/services/catalogos.service';
import { OperacionService } from '../../services/operacion.service';
@Component({
  selector: 'app-movimientotp',
  templateUrl: './movimientotp.component.html',
  styleUrl: './movimientotp.component.css'
})
export class MovimientotpComponent implements OnInit  {

  displayedColumns: string[] = ['id', 'rfid', 'numeroparte', 'descripcion', 'di',  'de', 'longitud', 'select'];
  columnIndex = { idNumeroParte: 2 }; 
  @ViewChild(MatPaginator) paginatior !:MatPaginator;
 
  dataSource: MatTableDataSource<Inventario>;

  searchTerm: string = ''; // Término de búsqueda
  value: string = '';

   datainventario: Inventario[]=[];

   companiaUsuario: number = 0;

   ubicacion: Ubicacion[] = [];
   pozo: Pozo[] = [];

   formMovimiento!: FormGroup;
   tubosSeleccionados: string = "";
   
   length = 100; // Número total de elementos
   pageSize = 10; // Tamaño de página
   pageSizeOptions: number[] = [5, 10, 20]; // Opciones de tamaño de página

   ngAfterViewInit() {
     this.dataSource.paginator = this.paginatior;
   };


  isEditable = true;

  esPozoIni = false;
  esPozoFin = false;

  selection = new SelectionModel<Inventario>(true, []);

  constructor(private formBuilder: FormBuilder
    , private alertService: AlertService
    , private operacionServices: OperacionService
    , private dialogBox: MatDialog
    , private sharedService: SharedService
    , private catalogos: CatalogosService
) 

{

this.dataSource = new MatTableDataSource<Inventario>([]);
this.dataSource.paginator=this.paginatior;


}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

ngOnInit(): void {

  this.formMovimiento = this.formBuilder.group({
    ubicacionIni: [''],
    pozoIni:['', Validators.compose([
      
    ])],
    ubicacionFin: [''],
    pozoFin:['', Validators.compose([
      
    ])],

  });
  this.companiaUsuario = this.sharedService.companiaUsuario;
//  this.getInventarioDisponible(this.companiaUsuario);
  this.getUbicacion();
  this.getPozo();

  
}

getInventarioDisponible(idcompania: number, idubicacion: number, idpozo: number) {
  const cuerpo = {
    "idCompania": idcompania,
    "idUbicacion": idubicacion,
    "idPozo": idpozo
  };

  let listainventario: any;
  this.operacionServices.getInventarioDisponible(cuerpo).pipe(
    catchError(error => {
      // Manejo del error
      console.log('Error en la solicitud objeto general:', error.error);
      alert( 'Error en la peticion de servicios APIs de lista inventario disponible');
      throw error; // Lanzar el error para que siga propagándose
    })
  ).subscribe(
    data => {
      this.datainventario = data;
      console.log('data: ', data);
      console.log('datainventario: ', this.datainventario);
      this.dataSource.data = this.datainventario;
      console.log(this.datainventario);
    }
  );
}

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    console.log('numSelected: ', numSelected);
    console.log('numRows: ', numRows);
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

    /** The label for the checkbox on the passed row */
checkboxLabel(row?: Inventario): string {
  if (!row) {
    return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.idInventario + 1}`;
}


obtenerFilasSeleccionadas() {
  const filasSeleccionadas = this.selection.selected;
  const idInventarios = filasSeleccionadas.map(fila => fila.idInventario);
  const nombres = filasSeleccionadas.map(fila => fila.rfid);

  const objetoJSON = idInventarios.map(id => ({ id: id }));

  const objetoJSONString = JSON.stringify(objetoJSON);
  this.tubosSeleccionados = objetoJSONString;
  console.log(objetoJSONString);
  console.log('TUBOS SELECCIONADOS: ',this.tubosSeleccionados);
  console.log('TUBOS SELECCIONADOS en json parse: ',JSON.parse(this.tubosSeleccionados));

  const idUbicacionOri = this.formMovimiento.get("ubicacionIni")?.value;
  const idUbicacionDest = this.formMovimiento.get("ubicacionFin")?.value;
  const pozoIni =  this.formMovimiento.get("pozoIni")?.value != 0? this.formMovimiento.get("pozoIni")?.value: 0;
  const pozoFin =  this.formMovimiento.get("pozoFin")?.value != 0? this.formMovimiento.get("pozoFin")?.value: 0;
  const tubos = JSON.parse(this.tubosSeleccionados)

  const resultado = {
  idinventario: tubos,
  idUbicacionOri: idUbicacionOri,
  idUbicacionDest: idUbicacionDest,
  idPozoOri: pozoIni,
  idPozoDest: pozoFin
  };

  console.log('OBJETO TUBOS DISPONIBLES: ',resultado);
  console.log('OBJETO TUBOS DISPONIBLES con JSON.stringify: ',JSON.stringify(resultado));

  if (this.tubosSeleccionados === "[]") {
    console.log("El arreglo de tubos seleccionados está vacío.");
    alert('No ha seleccionado ningun tubo para su movimiento correspondiente');
  } else {
    console.log("El arreglo de tubos seleccionados contiene elementos.");
    this.openConfirmacionDialog(resultado);
  }
}

moverTP() {

if (this.formMovimiento.get('ubicacionIni')?.value == '' || this.formMovimiento.get('ubicacionFin')?.value == '') {
  alert('Seleccione el origen y destino de los tubos a mover');
  return;

}

if (this.formMovimiento.get('ubicacionIni')?.value == 3) {
  if (this.formMovimiento.get('ubicacionFin')?.value == 3) {
    if (this.formMovimiento.get('pozoIni')?.value === this.formMovimiento.get('pozoFin')?.value) {
      alert('No se permite mover tubos al mismo pozo');
      this.formMovimiento.get('pozoFin')?.setValue('');
      return;
    } 
}

} else {
  if (this.formMovimiento.get('ubicacionIni') === this.formMovimiento.get('ubicacionFin')?.value) {
    alert('No se permite mover tubos a la misma ubicación');
    this.formMovimiento.get('ubicacionFin')?.setValue('');
    return;
}
}



    this.obtenerFilasSeleccionadas();
}

getUbicacion() {
  this.catalogos.getCatUbicacion().pipe(
    catchError(error => {
      // Manejo del error
      console.log('Error en la solicitud objeto general:', error.error);
      alert( 'Error en la peticion de servicios APIs de Diametros');
      throw error; // Lanzar el error para que siga propagándose
    })
  ).subscribe(
    data => {
      this.ubicacion = data;
      console.log(this.ubicacion);
    }
  );
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

onSelectIni(selectedValue: any) {
  this.selection.clear();
  const selectedUbicacion = this.ubicacion.find(ubi => ubi.id === selectedValue);

  console.log('valor id del select de ubicacion: ',selectedValue);
  console.log('valor de la descripcion del select de ubicacion: ',selectedUbicacion?.ubicacion);
  
  this.dataSource.data = [];

  if (selectedValue === 3) {
    this.formMovimiento.get("pozoIni")?.setValue('');
      this.esPozoIni = true
  }else {
      this.esPozoIni = false
      this.formMovimiento.get('pozoIni')?.setValue('');
    this.getInventarioDisponible(this.sharedService.companiaUsuario, selectedValue, 0);
  }
}

onSelectIniPozo(selectedValue: any) {
  const selectedUbicacion = this.pozo.find(poz => poz.id === selectedValue);

  console.log('valor id del select de pozo inicial: ',selectedValue);
  console.log('valor de la descripcion del select de pozo inicial: ',selectedUbicacion?.pozo);
  
  this.dataSource.data = [];

  this.getInventarioDisponible(this.sharedService.companiaUsuario, this.formMovimiento.get('ubicacionIni')?.value ,selectedValue);

}

onSelectFin(selectedValue: any) {
  const selectedUbicacion = this.ubicacion.find(ubi => ubi.id === selectedValue);

  console.log('valor id del select de ubicacion: ',selectedValue);
  console.log('valor de la descripcion del select de ubicacion: ',selectedUbicacion?.ubicacion);

  if (selectedValue === this.formMovimiento.get('ubicacionIni')?.value && selectedValue != 3 ) {
        alert('No se permite mover tubos a la misma ubicación');
        this.formMovimiento.get('ubicacionFin')?.setValue('');
        return;
  }  else {

      if (selectedValue === 3) {

          this.esPozoFin = true
      }else {
        this.formMovimiento.get('pozoFin')?.setValue('');
        this.esPozoFin = false
      }
}
}

onSelectFinPozo(selectedValue: any) {
  const selectedUbicacion = this.pozo.find(poz => poz.id === selectedValue);

  console.log('valor id del select de pozo fin: ',selectedValue);
  console.log('valor de la descripcion del select de pozofin: ',selectedUbicacion?.pozo);

  if (this.formMovimiento.get('ubicacionFin')?.value === 3 ) {
    if (selectedValue === this.formMovimiento.get('pozoIni')?.value) {
      alert('No se permite mover tubos al mismo pozo');
      this.formMovimiento.get('pozoFin')?.setValue('');
      return;
} 
}

}

openConfirmacionDialog(dato: any): void {

  const options = {
    title: 'SAAP',
    message: `¿Esta seguro de realizar esta asignación de tuberias? `,
    cancelText: 'NO',
    confirmText: 'SI'
  };

  this.alertService.open(options);
  this.alertService.confirmed().subscribe(confirmed => {
    if (confirmed) {
      console.log('metodo para guardado TUBOS SELECCIONADOS: ',dato);
      this.mueveTP(dato);
      
    }
  });
}

mueveTP(datos: any) {
  this.operacionServices.regMoverTP(datos).pipe(
    catchError(error => {
      console.log('Error en la solicitud:', error);
      alert('Error en el registro del tramo. Consulta la consola para más detalles.');
      throw error; // Lanzar el error para que siga propagándose
    })
  ).subscribe(
    data => {
      console.log(data); // Manejo exitoso de la respuesta
      alert('Movimiento exitoso de tubos');
      this.limpiarMovimientoTP();
    }
  );    

}

limpiarMovimientoTP() {
  this.formMovimiento.get('ubicacionIni')?.setValue('');
  this.formMovimiento.get('ubicacionFin')?.setValue('');
  this.formMovimiento.get('pozoIni')?.setValue('');
  this.formMovimiento.get('pozoFin')?.setValue('');
  this.esPozoIni = false;
  this.esPozoFin = false;
  this.dataSource.data = [];
  this.selection.clear();

}

}
