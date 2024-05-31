import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AlertService } from '../../../shared/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../../../shared/component/dialog-box/dialog-box.component';
import { AltainventarioComponent } from '../altainventario/altainventario.component';
import { EditainventarioComponent } from '../editainventario/editainventario.component';
import { InventarioService } from '../../services/inventario.service';
import { SharedService } from '../../../shared/services/shared.service';
import { catchError } from 'rxjs/operators';
import {Inventario } from '../../model/inventario.model'
import { ActualizacionTablaService } from '../../../shared/services/actualizaciontabla.service';
//import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent implements OnInit, OnDestroy{
  // displayedColumns: string[] = ['id', 'rfid', 'idnumeroparte', 'numeroparte', 'idcompania', 'compania', 'descripcion', 'iddi', 'di', 'idde', 'de', 'longitud', 'idubicacion', 'ubicacion', 'idrango', 'rango', 'esnuevo', 'bending', 'idestatus', 'estatus', 'fechaingreso', 'acciones'];
  displayedColumns: string[] = ['id', 'rfid', 'numeroparte', 'descripcion', 'di',  'de', 'longitud','acciones'];
  columnIndex = { idNumeroParte: 2 }; 
  @ViewChild(MatPaginator) paginatior !:MatPaginator;
 
  dataSource: MatTableDataSource<Inventario>;

  searchTerm: string = ''; // Término de búsqueda
  value: string = '';

   datainventario: Inventario[]=[];

   companiaUsuario: number = 0;

   private dialogCerradoSubscription!: Subscription;

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
              , private sharedService: SharedService
              , private actualizacionTablaService: ActualizacionTablaService
              )
 {
    
    this.dataSource = new MatTableDataSource<Inventario>([]);
    this.dataSource.paginator=this.paginatior;

    
  }

  ngOnInit(): void {
    //this.dataSource.data = datausuario;
    this.companiaUsuario = this.sharedService.companiaUsuario;
    this.getInventario(this.companiaUsuario);

    this.dialogCerradoSubscription = this.actualizacionTablaService.dialogCerrado$.subscribe(() => {
    this.getInventario(this.companiaUsuario);
    });
    
  }

  ngOnDestroy() {
    this.dialogCerradoSubscription.unsubscribe();
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

    this.alertService.open(options);
    this.alertService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        const infoborrado = {
          "idInventario": dato.idInventario,
          "tipoRegistro": "D"
        }
        this.deleteInventario(infoborrado);
        
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

  openEdicion(id:number): void {
    this.sharedService.edicionInventario = id;
    const dialogRef = this.dialogBox.open(DialogBoxComponent, {
        data: {
        title: 'Editar tramo',
        content: EditainventarioComponent 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('La ventana modal de edicion se ha cerrado');
      
    });
  }

  

  getInventario(compania: number) {
    let listainventario: any;
    this.inventarioServices.getInventario(compania).pipe(
      catchError(error => {
        // Manejo del error
        console.log('Error en la solicitud objeto general:', error.error);
        //this.toastr.error('Se produjo un error al obtener el inventario: ' + error.error, 'SAAP - Error');
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

  deleteInventario(datos: any) {
    let listainventario: any;
    this.inventarioServices.deleteInventario(datos).pipe(
      catchError(error => {
        // Manejo del error
        console.log('Error en la solicitud:', error);
        alert('Error en la solicitud. Consulta la consola para más detalles.');
        throw error; // Lanzar el error para que siga propagándose
      })
    ).subscribe(
      data => {
        console.log(data); 
        this.getInventario(this.companiaUsuario);
      }
    );
  }

  
  // deleteInventario(datos: any) {
  //   this.inventarioServices.deleteInventario(datos).subscribe(
  //     data => {
  //       console.log(data); 
  //       this.getInventario(this.companiaUsuario);

  //     },
  //     error => {
  //       console.log('Error en la solicitud:', error);
  //       alert('Error en la solicitud. Consulta la consola para más detalles.');
  //     }
  //   );
  // }

  // getInventario(compania: number) {

  // let listainventario: any;
  //   this.inventarioServices.getInventario(compania).subscribe(data => {
  //   this.datainventario = data;
  //   this.dataSource.data = this.datainventario;
  //   console.log (this.datainventario);
 
  //   })
  // }
}
