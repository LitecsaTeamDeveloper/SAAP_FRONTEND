import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// // Material Angular
// import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { MatCardModule } from '@angular/material/card';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import {MatIconModule} from '@angular/material/icon';
// import {MatInputModule} from '@angular/material/input';
// import {MatButtonModule} from '@angular/material/button';
// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatMenuModule} from '@angular/material/menu';
// import {MatSidenavModule} from '@angular/material/sidenav';
// import {MatDividerModule} from '@angular/material/divider';
// import {MatListModule} from '@angular/material/list';
// import { MatExpansionModule } from '@angular/material/expansion';
// import {MatSnackBarModule} from '@angular/material/snack-bar';

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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InventarioComponent,
    FallasComponent,
    InicioComponent,
    CatalogosComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
