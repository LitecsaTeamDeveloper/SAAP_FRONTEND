import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { AlertService } from '../../../shared/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../../../shared/component/dialog-box/dialog-box.component';
import { AltainventarioComponent } from '../altainventario/altainventario.component';
import { InventarioService } from '../../services/inventario.service';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

const datausuario: Usuario[] = [
  { id: 1, nombre: 'gallina 1', email: 'usuario1@example.com' },
  { id: 2, nombre: 'perro 2', email: 'usuario2@example.com' },
  { id: 3, nombre: 'Usuario 3', email: 'usuario3@gmail.com' },
  { id: 4, nombre: 'Usuario 4', email: 'usuario4@example.com' },
  { id: 5, nombre: 'gato 5', email: 'usuario5@example.com' },
  { id: 6, nombre: 'Usuario 6', email: 'usuario6@gmail.com' },
  { id: 7, nombre: 'puerco 7', email: 'usuario7@outlook.com' },
  { id: 8, nombre: 'Usuario 8', email: 'usuario8@example.com' },
  { id: 9, nombre: 'caballo 9', email: 'usuario9@example.com' },
  { id: 10, nombre: 'gallo 10', email: 'usuario10@gmail.com' },
  { id: 11, nombre: 'gallina 11', email: 'usuario1@example.com' },
  { id: 12, nombre: 'perro 12', email: 'usuario2@yahoo.com' },
  { id: 13, nombre: 'Usuario 13', email: 'usuario3@example.com' },
  { id: 14, nombre: 'Usuario 14', email: 'usuario4@example.com' },
  { id: 15, nombre: 'gato 15', email: 'usuario5@example.com' },
  { id: 16, nombre: 'Usuario 16', email: 'usuario6@yahoo.com' },
  { id: 17, nombre: 'puerco 17', email: 'usuario7@example.com' },
  { id: 18, nombre: 'Usuario 18', email: 'usuario8@example.com' },
  { id: 19, nombre: 'caballo 19', email: 'usuario9@yahoo.com' },
  { id: 20, nombre: 'gallo 20', email: 'usuario10@example.com' }  
];


@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent implements OnInit{
  displayedColumns: string[] = ['id', 'nombre', 'email', 'acciones'];
  @ViewChild(MatPaginator) paginatior !:MatPaginator;
  dataSource: MatTableDataSource<Usuario>;

  searchTerm: string = ''; // Término de búsqueda
  value: string = '';

    // Propiedades para la paginación
    length = 100; // Número total de elementos
    pageSize = 10; // Tamaño de página
    pageSizeOptions: number[] = [5, 10, 20]; // Opciones de tamaño de página

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginatior;
    };

  constructor(private alertService: AlertService
              , private inventarioServices: InventarioService
              , private dialogBox: MatDialog)
 {
    this.dataSource = new MatTableDataSource<Usuario>([]);
    this.dataSource.paginator=this.paginatior;

    
  }

  ngOnInit(): void {
    // Aquí puedes obtener los datos de la API y asignarlos a this.dataSource.data
    this.dataSource.data = datausuario;
    this.getInventario();
    
  }



  handlePageEvent(event: PageEvent) {
    this.dataSource.data = datausuario;
    this.length = event.length;
    this.pageSize = event.pageSize;
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.dataSource.data = this.dataSource.data.slice(startIndex, endIndex);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDeleteDialog(len: number): void {
    const options = {
      title: 'SAAP',
      message: `¿Esta seguro de eliminar el tramo ${len}?`,
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

  getInventario() {

let listainventario: any;
    this.inventarioServices.getInventario().subscribe(data => {
      listainventario = data;
    console.log (listainventario);
 
    })
  }
}
