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



@Component({
  selector: 'app-operacion',
  templateUrl: './operacion.component.html',
  styleUrl: './operacion.component.css'
})
export class OperacionComponent implements OnInit {

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


  // firstFormGroup = this._formBuilder.group({
  //   firstCtrl: ['', Validators.required],
  // });
  // secondFormGroup = this._formBuilder.group({
  //   secondCtrl: ['', Validators.required],
  // });
  isEditable = true;

  esPozo = false;


  // displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<Inventario>(true, []);


  constructor(private formBuilder: FormBuilder
              , private alertService: AlertService
              , private inventarioServices: InventarioService
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
      ubicacion: ['', Validators.required],
      pozo:['', Validators.compose([
        Validators.required
      ])],
    });
    this.companiaUsuario = this.sharedService.companiaUsuario;
    this.getInventarioDisponible(this.companiaUsuario);
    this.getUbicacion();
    this.getPozo();

    
  }

  getInventarioDisponible(compania: number) {
    let listainventario: any;
    this.inventarioServices.getInventarioDisponible(compania).pipe(
      catchError(error => {
        // Manejo del error
        console.log('Error en la solicitud objeto general:', error.error);
        alert( 'Error en la peticion de servicios APIs de lista inventario disponible');
        throw error; // Lanzar el error para que siga propagándose
      })
    ).subscribe(
      data => {
        this.datainventario = data;
        this.dataSource.data = this.datainventario;
        console.log(this.datainventario);
      }
    );
  }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
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
  
    // console.log('ID Inventarios seleccionados:', JSON.stringify(idInventarios));
    // console.log('Nombres seleccionados:', JSON.stringify(nombres));
    const objetoJSON = idInventarios.map(id => ({ idinventario: id }));

    const objetoJSONString = JSON.stringify(objetoJSON);
    this.tubosSeleccionados = objetoJSONString;
    console.log(objetoJSONString);
    console.log('TUBOS SELECCIONADOS: ',this.tubosSeleccionados);

    if (this.tubosSeleccionados === "[]") {
      console.log("El arreglo de tubos seleccionados está vacío.");
      alert('No ha seleccionado ningun tubo para su asignación correspondiente');
    } else {
      console.log("El arreglo de tubos seleccionados contiene elementos.");
      this.openConfirmacionDialog(this.tubosSeleccionados);

    }
  }

  getSeleccionados() {
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

  onSelect(selectedValue: any) {
    const selectedUbicacion = this.ubicacion.find(ubi => ubi.id === selectedValue);

    console.log('valor id del select de ubicacion: ',selectedValue);
    console.log('valor de la descripcion del select de ubicacion: ',selectedUbicacion?.ubicacion);

    if (selectedValue === 3) {
        this.esPozo = true
    }else {
      this.esPozo = false
    }
  }


  openConfirmacionDialog(dato: any): void {
    console.log(dato);
    const options = {
      title: 'SAAP',
      message: `¿Esta seguro de realizar esta asignación de tuberias? `,
      cancelText: 'NO',
      confirmText: 'SI'
    };

    this.alertService.open(options);
    this.alertService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        console.log('TUBOS SELECCIONADOS: ',this.tubosSeleccionados);
        // this.metodoparaguardado(this.tubosSeleccionados);
        
      }
    });
  }

}