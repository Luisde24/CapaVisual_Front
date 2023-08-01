import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-baseinsumo',
  templateUrl: './baseinsumo.component.html',
  styleUrls: ['./baseinsumo.component.css']
})
export class BaseinsumoComponent {



  btnEnviar(){
      
    var file = document.querySelector('input').value.substring(12);

    if(file != ""){
      Swal.fire({
        icon: 'success',
        title: `Archivo ${file} enviado correctamente`
       })
    }else{
      Swal.fire({
        icon: 'error',
        title: `Adjunte un archivo correctamente`
       })
    }

    this.recarga();
  }

  recarga(){
  setTimeout(() => {
    window.location.reload();
  }, 3000);

  }

}
