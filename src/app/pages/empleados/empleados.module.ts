import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadosRoutingModule } from './empleados-routing.module';
import { EmpleadosComponent } from './empleados.component';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';


@NgModule({
  declarations: [
    EmpleadosComponent
  ],
  imports: [
    CommonModule,
    EmpleadosRoutingModule,
    PrimeNgModule,
    ButtonModule,
    PaginatorModule,
    ReactiveFormsModule,
    ToastModule,
    SelectButtonModule,
    ConfirmDialogModule,
    ConfirmPopupModule
  ],
})
export class EmpleadosModule { }
