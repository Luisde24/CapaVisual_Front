import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthRoutingModule } from './component/Auth/auth.routing.module';
import { AreasComponent } from './component/Areas/areas.component';
import { OverTimeComponent } from './component/over-time/over-time.component';
import { BaseinsumoComponent } from './component/base/baseinsumo.component';
import { EmployeesComponent } from './component/employees/employees.component';

const routes: Routes = [

  {path:'horasExtras', component: OverTimeComponent},
  {path:'areas', component: AreasComponent},
  {path:'base', component: BaseinsumoComponent},
  {path:'empleado', component: EmployeesComponent}
  // {path:'' , pathMatch:'full', redirectTo:'/horasExtras'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes),
    AuthRoutingModule
  
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
