import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  private _nombreUsuario!: string;
  private _companiaUsuario!: number;
  private _edicionInventario!: number;
  selectedDate!: Date;

  constructor() { }

  set nombreUsuario(nombre: string) {
    this._nombreUsuario = nombre;
  }

  get nombreUsuario(): string {
    return this._nombreUsuario;
  }

  set companiaUsuario(idCompania: number) {
    this._companiaUsuario = idCompania;
  }

  get companiaUsuario(): number {
    return this._companiaUsuario;
  }

  set edicionInventario(idInventario: number) {
    this._edicionInventario = idInventario;
  }

  get edicionInventario(): number {
    return this._edicionInventario;
  }


  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }  

  // formatDate(date: Date): Date {
  //   const day = date.getDate().toString().padStart(2, '0');
  //   const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //   const year = date.getFullYear();
  //   return new Date(`${day}/${month}/${year}`);
  // }  
}