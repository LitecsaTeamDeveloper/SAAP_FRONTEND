import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  private _nombreUsuario!: string;

  constructor() { }

  set nombreUsuario(nombre: string) {
    this._nombreUsuario = nombre;
  }

  get nombreUsuario(): string {
    return this._nombreUsuario;
  }
}