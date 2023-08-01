import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './component/Auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';

import { AreasComponent } from './component/Areas/areas.component';
import { AppComponent } from './app.component';
import { NavComponent } from './Navbar/nav/nav.component';
import { OverTimeComponent } from './component/over-time/over-time.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DataTimeFormatPipe } from './component/helpers/data-time-format.pipe';
import { BaseinsumoComponent } from './component/base/baseinsumo.component';
import { EmployeesComponent } from './component/employees/employees.component';


@NgModule({
  declarations: 
  [
    AppComponent,
    AreasComponent,
    NavComponent,
    OverTimeComponent,
    DataTimeFormatPipe,
    BaseinsumoComponent,
    EmployeesComponent
  ],
  
  imports: 
  [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    HttpClientModule,
    FormsModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
