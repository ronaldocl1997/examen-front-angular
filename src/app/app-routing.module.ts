import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'empleados', loadChildren: () => import('./pages/empleados/empleados.module').then(m => m.EmpleadosModule)
  },
  { 
    path: '**', redirectTo: '/empleados', pathMatch: 'full' 
    // La ruta comodín '**' captura cualquier otra ruta y la redirige a '/empleados'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
