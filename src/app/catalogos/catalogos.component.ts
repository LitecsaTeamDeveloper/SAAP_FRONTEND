import { Component } from '@angular/core';

@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrl: './catalogos.component.css'
})
export class CatalogosComponent {
  elementos: any[] = [
    { titulo: 'Elemento 1', contenido: 'Contenido del elemento 1' },
    { titulo: 'Elemento 2', contenido: 'Contenido del elemento 2' },
    // Agrega más elementos según sea necesario
  ];
}
