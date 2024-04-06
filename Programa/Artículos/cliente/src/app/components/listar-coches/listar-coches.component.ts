import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { Coche } from 'src/app/models/coche';
import { CocheService } from 'src/app/services/coche.service';

@Component({
  selector: 'app-listar-coches',
  templateUrl: './listar-coches.component.html',
  styleUrls: ['./listar-coches.component.css']
})

export class ListarCochesComponent implements OnInit {
  listaForm: FormGroup;
  listCoches: Coche[] = [];
  usuario: Usuario = new Usuario("");
  opcion: string | null;
  texto: string | null;
  titulo = 'Listado de coches';
  id_usuario : string | null;
  id: string | null;

  constructor(private fb: FormBuilder, private router: Router, private _cocheService: CocheService, private toastr: ToastrService, private aRouter: ActivatedRoute) {
    this.listaForm = this.fb.group({
      id_usuario: ['', Validators.required],
    })
    this.opcion = this.aRouter.snapshot.paramMap.get('opcion');
    this.texto = this.aRouter.snapshot.paramMap.get('texto');
    this.id_usuario = this.aRouter.snapshot.paramMap.get('id_usuario');
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.obtenerCoches();
  }

  obtenerCoches() {
    
    if (this.id_usuario != null){

    this._cocheService.getUsuariosPorId(this.id_usuario).subscribe(data => { 
      this.usuario = data;
      if(this.usuario.rol=="Administrador"){
        this.toastr.success('El rol de user es: Administrador, puede realizar esta funcion');
        this.comprobarResto();      
      }

      else{
        this.toastr.error('El rol de user es cliente, necesitas ser administrador'); 
        this.router.navigate(['/listar-coches']);       
      }
  
    }, error => {
          this.toastr.error('ID no válido'); 
          console.log(error);
          this.router.navigate(['/listar-coches']);
    });

    }
  }
comprobarResto(){
  if(this.id!=null){//Si tiene ID eliminamos el usuario
    this.eliminarCoche(this.id);
  }
      if (this.opcion != null) //Cambiamos el título si es buscar
          this.titulo = 'Coches encontrados por ' + this.opcion + ':';
          
        if (this.opcion == 'id') { //Buscamos coches por id
          this._cocheService.getCochesPorId(this.texto).subscribe(data => {
            this.listCoches = data;
          }, error => {
            console.log(error);
          })

        } else if (this.opcion == 'marca') { //Buscamos coches por marca
          this._cocheService.getCochesPorMarca(this.texto).subscribe(data => {
            this.listCoches = data;
          }, error => {
            console.log(error);
          })

        } else { //Buscamos todos los coches
          this._cocheService.getCoches().subscribe(data => {
            this.listCoches = data;
          }, error => {
            console.log(error);
          })
        }
    }
  
  eliminarCoche(id: any) {
    this._cocheService.eliminarCoche(id).subscribe(data => {
      this.toastr.error('El coche fue eliminado correctamente', 'Coche Eliminado');
      this.router.navigate(['/listar-coches',this.id_usuario]);
    }, error => {
      console.log(error);
    })
  }

}
