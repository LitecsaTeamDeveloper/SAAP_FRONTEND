import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from '../menu/menu.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PaginatorEspanol } from '../shared/model/paginatorEspanol.model';

// Material Angular
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatBadgeModule} from "@angular/material/badge";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatPaginatorIntl} from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
        
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatSlideToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    FormsModule

  ],
  exports: [
    MatSlideToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    FormsModule

  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: PaginatorEspanol }
  ]

})
export class HomeModule { }
