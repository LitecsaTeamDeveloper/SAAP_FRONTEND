import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';


export interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent implements OnInit{
  displayedColumns: string[] = ['id', 'nombre', 'email', 'acciones'];
  dataSource: MatTableDataSource<Usuario>;

  constructor() {
    this.dataSource = new MatTableDataSource<Usuario>([]);
  }

  ngOnInit(): void {
    // Aquí puedes obtener los datos de la API y asignarlos a this.dataSource.data
    this.dataSource.data = [
      { id: 1, nombre: 'Usuario 1', email: 'usuario1@example.com' },
      { id: 2, nombre: 'Usuario 2', email: 'usuario2@example.com' },
      { id: 3, nombre: 'Usuario 3', email: 'usuario3@example.com' },
      { id: 4, nombre: 'Usuario 4', email: 'usuario4@example.com' },
      { id: 5, nombre: 'Usuario 5', email: 'usuario5@example.com' },
      { id: 6, nombre: 'Usuario 6', email: 'usuario6@example.com' },
      { id: 7, nombre: 'Usuario 7', email: 'usuario7@example.com' },
      { id: 8, nombre: 'Usuario 8', email: 'usuario8@example.com' },
      { id: 9, nombre: 'Usuario 9', email: 'usuario9@example.com' },
      { id: 10, nombre: 'Usuario 10', email: 'usuario10@example.com' }
    ];
  }

}
