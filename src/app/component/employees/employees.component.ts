import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TransaccionesService } from 'src/services/transacciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {

  listEmployees: any;
   listAreas: any;
  constructor(
   private transacion: TransaccionesService,
   private toastrService: ToastrService,
   
   ){}
  ngOnInit(): void {
    this.getListEmployees();
    this.getNameAreas();
    }
      //Lista de Regsitros
      getListEmployees(){
       
        this.transacion.getListEmployees().subscribe(resp => {
          this.listEmployees = resp;
        });
      
      }

      getNameAreas(){
        this.transacion.getListAreas().subscribe(resp => {
          this.listAreas = resp;
        });
      }

onAdd(bodyHtml:string){

  Swal.fire({
    title: 'Creacion del empleado',
    text: "El nombre del area es obligatorio",
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Guardar',
    html: bodyHtml,
    preConfirm: () => { 
      const nombre =  document.getElementById('inputNombre')! as HTMLInputElement;
      const apellido =  document.getElementById('inputApellido')! as HTMLInputElement;
      const tipoIdentificacion =  document.getElementById('selectTipoIdentificacion')! as HTMLInputElement;
      const identificacion =  document.getElementById('inputIdentificacion')! as HTMLInputElement;
      const correo =  document.getElementById('inputCorreo')! as HTMLInputElement;
      const celular =  document.getElementById('inputCelular')! as HTMLInputElement;
      const area =  document.getElementById('opciones-select')! as HTMLInputElement;


      const nombres = nombre.value;
      const apellidos = apellido.value;
      const tipoIdentificacions = tipoIdentificacion.value;
      const identificacions = identificacion.value;
      const correos = correo.value;
      const celulars = celular.value;
      const areas = area.value;

      return { nombres, apellidos, tipoIdentificacions, identificacions, correos, celulars, areas};
    },
  }).then((result) => {

    // this.createRegister(reason, parseInt(additionalTime), dateOfRequest, leader, parseInt(typeRemuneration), parseInt(state), parseInt(areaId), parseInt(employeesId));
    if (result.isConfirmed) {
      const data = result.value;

      this.transacion.createEmployees(data.nombres, data.apellidos, parseInt(data.tipoIdentificacions), data.identificacions, data.correos, data.celulars, parseInt(data.areas)).subscribe(resp => {
        console.log(resp);
      });
      this.recargar();
    }

  });

}
      

  onEdit(persona){
  
  
  }


  ondelete(persona){
  
  
  }

  frmAdd(){
  // const opcionesHTML = this.listaOverTime.map((opcion) => ).join('');
  let area:any = [];
  let options: any

 options = this.listAreas.map(resp =>{ 
    
    if(!area.includes(resp.name)){
      area.push(resp.name);
      return `<option value=${resp.id}>${resp.name}</option>` 
    }
    return false;
  });

    let bodyHtml = `
    <div class="row">
         <div class="col-md-6">
             <form>
               <div class="form-group">
                 <label for="inputNombre">Nombre</label>
                 <input type="text" class="form-control" id="inputNombre">
               </div>
               <div class="form-group">
                 <label for="selectTipoRemuneracion">Tipo de identificación</label>
                 <select class="form-control" id="selectTipoIdentificacion">
                 <option value="0"></option>
                   <option value="1">Cedula de ciudadania</option>
                   <option value="2">Cedula Extranjeria</option>
                 </select>
               </div>
               <div class="form-group">
                 <label for="inputCelular">Celular</label>
                 <input type="text" class="form-control" id="inputCelular" >
               </div>
             </form>
         </div>
  
           <div class="col-md-6">
                <div class="form-group">
                 <label for="inputApellido">Apellido</label>
                 <input type="text" class="form-control" id="inputApellido">
               </div>
  
               <div class="form-group">
                   <label for="inputCorreo">Identificación</label>
                   <input type="text" class="form-control" id="inputIdentificacion">
               </div>

               <div class="form-group">
                 <label for="selectAreaTrabajo">Área de Trabajo</label>
                 <select class="form-control" id="opciones-select">
                   <option value="0">seleccione un area</option>
                   ${options}
                 </select>
               </div>
  
               <div class="form-group">
                   <label for="inputCorreo">Correo</label>
                   <input type="email" class="form-control" id="inputCorreo">
               </div>
             </div>
      </div>`
      this.onAdd(bodyHtml);
  }
  

  recargar(){
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }


}
