import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import axios from 'axios';

export const UrlBase = 'https://localhost:7026/api/';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {

  constructor(
    private http: HttpClient,
    
    
    ) { }



  //anejo de empleados


  //Lista de Empleados
  getListEmployees(): Observable<any>{
    return this.http.get(UrlBase + "Employees/GetListEmployees");
  }

  //crear empleado

  createEmployees(name: string, lastname:string, typeIdentification: number, identification: string, email: string, phone:string, areaId: number): Observable<any>{

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
  
      const params = {
        name: name,
        lastname: lastname,
        typeIdentification: typeIdentification,
        identification: identification,
        email:email,
        phone: phone,
        areaId: areaId
      };
  
      return this.http.post(UrlBase + "Employees/CreateEmployee", params, httpOptions).pipe(resp => resp);;
  }






  //Crear areas
  createArea(name: string): Observable<any>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    const params = {
      id: 0,
      name: name
    };

    return this.http.post(UrlBase + "Areas/CreateArea", params, httpOptions).pipe(resp => resp);;
  }

  //Editar Areas


  //Eliminar Areas






/// Manejo de Areas





  //Lista de Areas
  getListAreas(): Observable<any>{
    return this.http.get(UrlBase + "Areas/GetListAreas");
  }


//





  // Horas Extras

  //Lista de registros de Horas extras
  getListOverTime(): Observable<any>{
    return this.http.get(UrlBase + "ManagementOfOverTime/GetListOverTime");
  }

  createOverTime(reason: string, additionalTime: number, dateOfRequest: string, leader:string, state: number, typeRemuneration: number, employeesId:number, areaId:number): Observable<any>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    const params = {
      reason: reason,
      additionalTime: additionalTime,
      dateOfRequest: dateOfRequest,
      leader: leader,
      state: state,
      typeRemuneration: typeRemuneration,
      employeesId: employeesId,
      areaId: areaId,
    };

    return this.http.post(UrlBase + "ManagementOfOverTime/CreateOverTime", params, httpOptions).pipe(resp => resp);
  }
   
  editOverTime(id:number, reason: string, additionalTime: number, dateOfRequest: string, leader:string, state: number, typeRemuneration: number, employeesId:number, areaId:number): Observable<any>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    const params = {
      reason: reason,
      additionalTime: additionalTime,
      dateOfRequest: dateOfRequest,
      leader: leader,
      state: state,
      typeRemuneration: typeRemuneration,
      employeesId: employeesId,
      areaId: areaId,
      id: 0
    };

    params.id = id;

    return this.http.put(UrlBase + "ManagementOfOverTime/UpdateOverTime", params, httpOptions);
  }

 async deleteOverTime(id:number){
    let response: any;
  await  axios.delete(UrlBase + `ManagementOfOverTime/${id}`)
    .then(respn => {
      
     return  response  = respn;
  
    })
    .catch(error => {
      
     return response = error;
   
    });


    return response.data;
    

  }
   
}





