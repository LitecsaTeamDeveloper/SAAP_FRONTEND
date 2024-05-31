import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ActualizacionTablaService } from './shared/services/actualizaciontabla.service'

//Componentes
import { LoginComponent } from './auth/components/login/login.component';
import { HomeModule } from './home/home.module';
import { InventarioComponent } from './inventario/components/inventario/inventario.component';
import { FallasComponent } from './catalogos/components/fallas/fallas.component';
import { InicioComponent } from './inicio/inicio/inicio.component';
import { CatalogosComponent } from './catalogos/catalogos.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './shared/interceptor//loading.interceptor';
import { DialogBoxComponent } from './shared/component/dialog-box/dialog-box.component';
import { AlertBoxComponent } from './shared/component/alert-box/alert-box.component';
import { AltainventarioComponent } from './inventario/components/altainventario/altainventario.component';
import { EditainventarioComponent } from './inventario/components/editainventario/editainventario.component';
import { OperacionComponent } from './operacion/components/operacion/operacion.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InventarioComponent,
    FallasComponent,
    InicioComponent,
    CatalogosComponent,
    SpinnerComponent,
    DialogBoxComponent,
    AlertBoxComponent,
    AltainventarioComponent,
    EditainventarioComponent,
    OperacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'es' },
    ActualizacionTablaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeEs);
  }
 }
