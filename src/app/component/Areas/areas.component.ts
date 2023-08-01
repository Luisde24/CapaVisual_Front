import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TransaccionesService } from 'src/services/transacciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {
 
 listAreas: any;

 constructor(
  private transacion: TransaccionesService,
  private toastrService: ToastrService,
  
  ){}

ngOnInit(): void {
this.getListAreas();
}
  //Lista de Regsitros
  getListAreas(){
   
    this.transacion.getListAreas().subscribe(resp => {
      this.listAreas = resp;
       console.log(this.listAreas);
    });
  
  }

onAdd(bodyHtml:string){

  Swal.fire({
    title: 'Creacion de Areas',
    text: "El nombre del area es obligatorio",
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Guardar',
    html: bodyHtml,
    preConfirm: () => { 
      const nombre =  document.getElementById('inpuNombre')! as HTMLInputElement;
      
      const nombres = nombre.value;

      return { nombres};
    },
  }).then((result) => {

    // this.createRegister(reason, parseInt(additionalTime), dateOfRequest, leader, parseInt(typeRemuneration), parseInt(state), parseInt(areaId), parseInt(employeesId));
    if (result.isConfirmed) {
      const data = result.value;

       this.transacion.createArea(data.nombres).subscribe(resp => {
        console.log(resp);
      });
      this.recargar();
    }

  });

}

frmAdd(){
  let bodyHtml = `
    <div class="row">
             <div class="form-group">
               <label for="inputNombre">Nombre</label>
               <input type="text" class="form-control" id="inpuNombre">
             </div>
    </div>`
    this.onAdd(bodyHtml);
}

  onEdit(persona){
  
  
  }


  ondelete(persona){
  
  
  }


  recargar(){
    setTimeout(() => {
      window.location.reload();
    }, 3000);

  }

}
