import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  private _nombreUsuario!: string;
  private _companiaUsuario!: number;

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

}