import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { CocheService } from 'src/app/services/coche.service';

@Component({
  selector: 'app-buscar-coches',
  templateUrl: './buscar-coches.component.html',
  styleUrls: ['./buscar-coches.component.css']
})
export class BuscarCochesComponent {
buscarForm: FormGroup;
id_usuario : string | null;
usuario: Usuario = new Usuario("");

constructor(private fb: FormBuilder, private _cocheService: CocheService, private toastr: ToastrService, private router: Router, private aRouter: ActivatedRoute) {

  this.buscarForm = this.fb.group({
    id_usuario: ['', Validators.required],//ANADIDO
    texto: ['', Validators.required],
    opcion: ['',Validators.required]
  })

   this.id_usuario = this.aRouter.snapshot.paramMap.get('id_usuario');

}
ngOnInit(): void {//metodo que se ejecuta al inicio
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
  
    if (this.id_usuario != null){
        this._cocheService.getUsuariosPorId(this.id_usuario).subscribe(data => { 
          this.usuario = data;
          if(this.usuario.rol=="Administrador"){
            this.toastr.success('El rol de user es: Administrador, puede realizar esta funcion');                   
          }
          else{
            this.toastr.error('El rol de user es cliente, necesitas ser administrador'); 
            this.router.navigate(['/']);       
          }
          
        }, error => {
          console.log(error);
          this.toastr.error('El ID introducido es inválido');
          this.router.navigate(['/']);
        });

    }
   
  }






}
