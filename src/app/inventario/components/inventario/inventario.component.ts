import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { AlertService } from '../../../shared/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../../../shared/component/dialog-box/dialog-box.component';
import { AltainventarioComponent } from '../altainventario/altainventario.component';
import { InventarioService } from '../../services/inventario.service';
import { SharedService } from '../../../shared/services/shared.service';
import { catchError } from 'rxjs/operators';


export interface Inventario {
    idInventario:  number; 
    rfid:  string; 
    idNumeroParte:  number; 
    numeroParte:  string; 
    idCompania:  number; 
    compania:  string; 
    descripcion:  string; 
    idDiametroInterior:  number; 
    diametroInterior:  string; 
    idDiametroExterior:  number; 
    diametroExterior:  string; 
    longitud:  number; 
    idUbicacion:  number; 
    ubicacion:  string; 
    idRango:  number; 
    rango: string ; 
    esNuevo:  boolean; 
    bending:  number; 
    idEstatus:  number; 
    estatus:  string; 
    fechaIngreso:  Date; 
}

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent implements OnInit{
  // displayedColumns: string[] = ['id', 'rfid', 'idnumeroparte', 'numeroparte', 'idcompania', 'compania', 'descripcion', 'iddi', 'di', 'idde', 'de', 'longitud', 'idubicacion', 'ubicacion', 'idrango', 'rango', 'esnuevo', 'bending', 'idestatus', 'estatus', 'fechaingreso', 'acciones'];
  displayedColumns: string[] = ['id', 'rfid', 'numeroparte', 'descripcion','acciones'];
  columnIndex = { idNumeroParte: 2 }; 
  @ViewChild(MatPaginator) paginatior !:MatPaginator;
 
  dataSource: MatTableDataSource<Inventario>;

  searchTerm: string = ''; // Término de búsqueda
  value: string = '';

   datainventario: Inventario[]=[];

   companiaUsuario: number = 0;

    // Propiedades para la paginación
    length = 100; // Número total de elementos
    pageSize = 10; // Tamaño de página
    pageSizeOptions: number[] = [5, 10, 20]; // Opciones de tamaño de página

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginatior;
    };

  constructor(private alertService: AlertService
              , private inventarioServices: InventarioService
              , private dialogBox: MatDialog
              , private sharedService: SharedService)
 {
    
    this.dataSource = new MatTableDataSource<Inventario>([]);
    this.dataSource.paginator=this.paginatior;

    
  }

  ngOnInit(): void {
    //this.dataSource.data = datausuario;
    this.companiaUsuario = this.sharedService.companiaUsuario;
    this.getInventario(this.companiaUsuario);
    
  }



  // handlePageEvent(event: PageEvent) {
  //   this.dataSource.data = datausuario;
  //   this.length = event.length;
  //   this.pageSize = event.pageSize;
  //   const startIndex = event.pageIndex * event.pageSize;
  //   const endIndex = startIndex + event.pageSize;
  //   this.dataSource.data = this.dataSource.data.slice(startIndex, endIndex);
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDeleteDialog(dato: any): void {
    console.log(dato);
    const options = {
      title: 'SAAP',
      message: `¿Esta seguro de eliminar el tramo: ` + dato.descripcion + ' ?',
      cancelText: 'NO',
      confirmText: 'SI'
    };

    // If user confirms, remove selected row from data table
    this.alertService.open(options);
    this.alertService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        console.log('borrado');
      }
    });
  }

  openAlta(): void {
    const dialogRef = this.dialogBox.open(DialogBoxComponent, {
      data: {
        title: 'Agregar tramo',
        content: AltainventarioComponent 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('La ventana modal se ha cerrado');
      
    });
  }


  

  getInventario(compania: number) {
    let listainventario: any;
    this.inventarioServices.getInventario(compania).pipe(
      catchError(error => {
        // Manejo del error
        console.log('Error en la solicitud objeto general:', error.error);
        console.log('Error en la solicitud:', error.status);
        // Aquí puedes mostrar un mensaje de error al usuario o realizar cualquier otra acción necesaria.
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
  
  // getInventario(compania: number) {

  // let listainventario: any;
  //   this.inventarioServices.getInventario(compania).subscribe(data => {
  //   this.datainventario = data;
  //   this.dataSource.data = this.datainventario;
  //   console.log (this.datainventario);
 
  //   })
  // }
}
