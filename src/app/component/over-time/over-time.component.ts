import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TransaccionesService } from 'src/services/transacciones.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-over-time',
  templateUrl: './over-time.component.html',
  styleUrls: ['./over-time.component.css']
})
export class OverTimeComponent  implements OnInit{


 public listaOverTime: any;
 public listEmployees: any;
 public listAreas: any;
 public response: any
 public reponseDelete: string = '';
 modalRef?: BsModalRef;

  constructor(
    private transacion: TransaccionesService,
    private toastrService: ToastrService,
    ){}

  ngOnInit(): void {
    this.getListOverTime();
    this.getNameEmployees();
    this.getNameAreas();
  }

  //listaEmpleados

  getNameEmployees(){
    this.transacion.getListEmployees().subscribe(resp => {
      this.listEmployees = resp;
    });
  }

  //Lista de areas

  getNameAreas(){
    this.transacion.getListAreas().subscribe(resp => {
      this.listAreas = resp;
    });
  }


  //Lista de Regsitros
  getListOverTime(){
   
    this.transacion.getListOverTime().subscribe(resp => {
      this.listaOverTime = resp;
      // console.log(resp);
    });
  
  }

  //crear registro
createRegister(reason: string, additionalTime: number, dateOfRequest: string, leader:string, state: number, typeRemuneration: number, employeesId:number, areaId:number){

  this.transacion.createOverTime(reason, additionalTime, dateOfRequest, leader,state, typeRemuneration, employeesId, areaId).subscribe(resp => {
        this.response = resp;
        console.log("create " + this.response);
        
  })

}

  //editar registrs

editarRegister(id: number, reason: string, additionalTime: number, dateOfRequest: string, leader:string, state: number, typeRemuneration: number, employeesId:number, areaId:number){
 console.log("motivo" + reason + " hora dicional " + additionalTime + " fecha " + dateOfRequest + " lider " + leader + " stado " + state + " tipo remuneracion " + typeRemuneration + " empleadoId " + employeesId + " areaid " + areaId );

     this.transacion.editOverTime(id, reason, additionalTime, dateOfRequest, leader,state, typeRemuneration, employeesId, areaId).subscribe(resp => {
      console.log(resp);
      
    });
}

  //eliminar

async deleteRegister(id: number){
   return await this.transacion.deleteOverTime(id);
}



  addRegister (bodyHtml:string){
    Swal.fire({
          title: 'Ingreso de Horas Extras',
          text: "Todos los campos del formulario son Obligatorios",
          icon: 'info',
          width: 500,
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Guardar',
          html: bodyHtml,
          preConfirm: () => { 
            const empleado =  document.getElementById('select-empleado')! as HTMLInputElement;
            const motivo = document.getElementById('inputMotivo')! as HTMLInputElement;
            const horasExtras = document.getElementById('inputHorasExtras')! as HTMLInputElement;
            const fechaSolicitud = document.getElementById('inputFechaSolicitud')! as HTMLInputElement;
            const liderArea = document.getElementById('inputLiderArea')! as HTMLInputElement;
            const tipoRemuneracion = document.getElementById('selectTipoRemuneracion')! as HTMLInputElement;
            const areaTrabajo = document.getElementById('opciones-select') as HTMLSelectElement;
            const estadoSolicitud = document.getElementById('selectEstado')! as HTMLInputElement;
            
            const employeesId = empleado.value;
            const reason = motivo.value;
            const additionalTime = horasExtras.value;
            const dateOfRequest = fechaSolicitud.value;
            const leader = liderArea.value;
            const typeRemuneration = tipoRemuneracion.value;
            const areaId = areaTrabajo.value;
            const state = estadoSolicitud.value;
      
            return { reason, additionalTime, dateOfRequest, leader, typeRemuneration, state, areaId, employeesId};
          },
        }).then((result) => {
 
          // this.createRegister(reason, parseInt(additionalTime), dateOfRequest, leader, parseInt(typeRemuneration), parseInt(state), parseInt(areaId), parseInt(employeesId));
          if (result.isConfirmed) {
            const data = result.value;
    
            this.createRegister(data.reason, parseInt(data.additionalTime), data.dateOfRequest, data.leader, parseInt(data.state), parseInt(data.typeRemuneration), parseInt(data.employeesId), parseInt(data.areaId));
            this.recargar();
          }
 
        });
        
          
  }

  recargar(){
    setTimeout(() => {
      window.location.reload();
    }, 3000);

  }


 frmRegister() {

  // const opcionesHTML = this.listaOverTime.map((opcion) => ).join('');
  let options:any;
  let employees: any
  let area:any = [];
  let name:any = [];
  options = this.listAreas.map(resp =>{ 
    
    if(!area.includes(resp.name)){
      area.push(resp.name);
      return `<option value=${resp.id}>${resp.name}</option>` 
    }
    return false;
  });

  employees = this.listEmployees.map(resp =>{
    
    let nombreCompleto = resp.nombres + ' ' + resp.apellidos;

    if(!name.includes(nombreCompleto) ){
      name.push(resp.nombreCompleto);
      return `<option value=${resp.id}>${nombreCompleto}</option>`
    }
    return false;
  });


 let bodyHtml = `
  <div class="row">
       <div class="col-md-6">
           <form>
             <div class="form-group">
               <label for="inputEmpleado">Empleado</label>
               <select class="form-control" id="select-empleado">
                 <option value="0">selecciona un empleado</option>
                 ${employees}
               </select>
             </div>
        
             <div class="form-group">
               <label for="inputMotivo">Motivo</label>
               <input type="text" class="form-control" id="inputMotivo">
             </div>
        
             <div class="form-group">
               <label for="inputHorasExtras">Horas extras</label>
               <input type="number" class="form-control" id="inputHorasExtras" min="1" max="2" >
             </div>
        
             <div class="form-group">
               <label for="inputFechaSolicitud">Fecha de solicitud</label>
               <input type="date" class="form-control" id="inputFechaSolicitud">
             </div>
           </form>
       </div>

       <div class="col-md-6">
           <div class="form-group">
             <label for="inputLiderArea">Líder del área</label>
             <input type="text" class="form-control" id="inputLiderArea" >
           </div>
    
             <div class="form-group">
               <label for="selectTipoRemuneracion">Remuneración</label>
               <select class="form-control" id="selectTipoRemuneracion">
               <option value="0"></option>
                 <option value="1">Descanso</option>
                 <option value="2">Salario</option>
               </select>
             </div>
    
             <div class="form-group">
               <label for="selectAreaTrabajo">Área de Trabajo</label>
               <select class="form-control" id="opciones-select">
                 <option value="0">seleccione un area</option>
                 ${options}
               </select>
             </div>
    
             <div class="form-group">
               <label for="inputEstadoSolicitud">Estado de la Solicitud</label>
               <select class="form-control" id="selectEstado" disabled>
                 <option value="3">Pendiente</option>
                 <option value="1">Aprobado</option>
                 <option value="2">Rechazdo</option>
               </select>
             </div>
           </div>
    </div>`

    this.addRegister(bodyHtml);
  }



  onEdit(data: any){

    console.log(data);
    
      let options:any;
      let employees: any
      let area:any = [];
      let name:any = [];
      options = this.listAreas.map(resp =>{ 
        
        if(!area.includes(resp.name)){
          area.push(resp.name);
          return `<option value=${resp.id}>${resp.name}</option>` 
        }
        return false;
      });
    
      employees = this.listEmployees.map(resp =>{
        
        if(!name.includes(resp.nombres) ){
          name.push(resp.nombres);
          return `<option value=${resp.id}>${resp.nombres + ' '+  resp.apellidos}</option>`
        }
        return false;
      });
    
      
      let bodyHtml = `
  <div class="row">
       <div class="col-md-6">
           <form>
             <div class="form-group">
               <label for="inputEmpleado">Empleado</label>
               <select class="form-control" id="select-empleado">
                 <option value="${data.empleadoId}" >${data.empleado}</option>
                 ${employees}
               </select>
             </div>
        
             <div class="form-group">
               <label for="inputMotivo">Motivo</label>
               <input type="text" class="form-control" id="inputMotivo" value="${data.motivo}">
             </div>
        
             <div class="form-group">
               <label for="inputHorasExtras">Horas extras</label>
               <input type="number" class="form-control" id="inputHorasExtras" min="1" max="2" value="${data.horasExtras}">
             </div>
        
             <div class="form-group">
               <label for="inputFechaSolicitud">Fecha de solicitud</label>
               <input type="date" class="form-control" id="inputFechaSolicitud" value="${data.fechaSolicitud}">
             </div>
           </form>
       </div>

       <div class="col-md-6">
           <div class="form-group">
             <label for="inputLiderArea">Líder del área</label>
             <input type="text" class="form-control" id="inputLiderArea" value="${data.liderArea}">
           </div>
    
             <div class="form-group">
               <label for="selectTipoRemuneracion">Remuneración</label>
               <select class="form-control" id="selectTipoRemuneracion">
               <option value="${data.tipoRemuneracionId}">${data.tipoRemuneracion}</option>
                 <option value="1">Salario</option>
                 <option value="2">Descanso</option>
               </select>
             </div>
    
             <div class="form-group">
               <label for="selectAreaTrabajo">Área de Trabajo</label>
               <select class="form-control" id="opciones-select">
                 <option value="${data.areaId}">${data.area}</option>
                 ${options}
               </select>
             </div>
    
             <div class="form-group">
               <label for="inputEstadoSolicitud">Estado de la Solicitud</label>
               <select class="form-control" id="selectEstado" disabled>
                 <option value="1">Pendiente</option>
                 <option value="2">Aprobado</option>
                 <option value="3">Rechazdo</option>
               </select>
             </div>
           </div>
    </div>`

    Swal.fire({
      title: 'Editar registro de horas extras',
      icon: 'info',
      width: 500,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Guardar',
      html: bodyHtml,
      preConfirm: () => { 
        const empleado =  document.getElementById('select-empleado')! as HTMLInputElement;
        const motivo = document.getElementById('inputMotivo')! as HTMLInputElement;
        const horasExtras = document.getElementById('inputHorasExtras')! as HTMLInputElement;
        const fechaSolicitud = document.getElementById('inputFechaSolicitud')! as HTMLInputElement;
        const liderArea = document.getElementById('inputLiderArea')! as HTMLInputElement;
        const tipoRemuneracion = document.getElementById('selectTipoRemuneracion')! as HTMLInputElement;
        const areaTrabajo = document.getElementById('opciones-select') as HTMLSelectElement;
        const estadoSolicitud = document.getElementById('selectEstado')! as HTMLInputElement;
        
        const identificador = data.id;
        const employeesId = empleado.value;
        const reason = motivo.value;
        const additionalTime = horasExtras.value;
        const dateOfRequest = fechaSolicitud.value;
        const leader = liderArea.value;
        const typeRemuneration = tipoRemuneracion.value;
        const areaId = areaTrabajo.value;
        const state = estadoSolicitud.value;
  
        return { identificador, reason, additionalTime, dateOfRequest, leader, typeRemuneration, state, areaId, employeesId};
      },
    }).then((result) => {

      // this.createRegister(reason, parseInt(additionalTime), dateOfRequest, leader, parseInt(typeRemuneration), parseInt(state), parseInt(areaId), parseInt(employeesId));
      if (result.isConfirmed) {
        const datos = result.value;
     
       this.editarRegister(parseInt(data.id), datos.reason, parseInt(datos.additionalTime), datos.dateOfRequest, datos.leader, parseInt(datos.state), parseInt(datos.typeRemuneration), parseInt(datos.employeesId), parseInt(datos.areaId));
       this.recargar();
      }

    })
      
  }

  ondelete(data: any){
    let response: Promise<any> | string


    Swal.fire({
        icon: 'info',
        title: `¿Deseas eliminar el registro del empleado ${data.empleado}`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Eliminar',
       }).then((result) => {
        // this.createRegister(reason, parseInt(additionalTime), dateOfRequest, leader, parseInt(typeRemuneration), parseInt(state), parseInt(areaId), parseInt(employeesId));
        if (result.isConfirmed) {
        
         this.deleteRegister(data.id);
         this.recargar();
        }
      
      }); 
  
  }

}


