import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FallasComponent } from '../catalogos/components/fallas/fallas.component';
import { InventarioComponent } from '../inventario/components/inventario/inventario.component';
import { InicioComponent } from '../inicio/inicio/inicio.component';
import { CatalogosComponent } from '../catalogos/catalogos.component';


const routes: Routes = [
  {
    path: '', component:HomeComponent, children: [
      { path: '', component: InicioComponent },
      { path: 'inicio', component: InicioComponent },
      { path: 'catalogo', component: CatalogosComponent },
      { path: 'inventario', component: InventarioComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
