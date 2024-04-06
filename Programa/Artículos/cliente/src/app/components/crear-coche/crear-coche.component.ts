import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { Coche } from 'src/app/models/coche';
import { CocheService } from 'src/app/services/coche.service';

@Component({
  selector: 'app-crear-coche',
  templateUrl: './crear-coche.component.html',
  styleUrls: ['./crear-coche.component.css']
})

export class CrearCocheComponent implements OnInit {
  cocheForm: FormGroup;
  titulo = 'Crear coche';
  id: string | null;//EL ID DEL COCHE
  id_usuario: string | null;
  usuario: Usuario = new Usuario("");

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private _cocheService: CocheService, private aRouter: ActivatedRoute) {
    
    this.cocheForm = this.fb.group({
      id_usuario: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      potencia: ['', Validators.compose([Validators.required, Validators.min(0)])],
      combustible: ['', Validators.required],
      traccion: ['', Validators.required],
      cantidad: ['', Validators.compose([Validators.required, Validators.min(0)])],
      precio: ['', Validators.compose([Validators.required, Validators.min(0)])]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');//El que le paso desde editar de listar
    this.id_usuario = this.aRouter.snapshot.paramMap.get('id_usuario');//El que le paso desde listar

  }

  ngOnInit(): void {
    this.esEditar();
  }

  esEditar() {
    console.log("VAMOS A EDITAR");
    if (this.id_usuario != null){//El ID metido en ID_usuario dentro de listar
      this._cocheService.getUsuariosPorId(this.id_usuario).subscribe(data => { 
        this.usuario = data;
        if(this.usuario.rol=="Administrador"){
          this.toastr.success('El rol de user es: '+ this.usuario.rol+ ' puede realizar esta funcion'); 
          this.comprobarEditar();   //Para poder editar hace falta comprobar el ID tambien            
        }
        else{
          this.toastr.error('El rol de user es cliente, necesitas ser administrador'); 
          this.router.navigate(['/']);       
        }
        
      }, error => {
        this.toastr.error('ID no válido');
        console.log(error);
        this.router.navigate(['/']);
      });

    }
  }

  comprobarEditar(){
    if (this.id != null) {//El ID del objeto coche seleccionado
      this.titulo = 'Editar Coche';
      this._cocheService.obtenerCoche(this.id).subscribe(data => {
        this.cocheForm.setValue({
          id_usuario: "",
          marca: data.marca,
          modelo: data.modelo,
          potencia: data.potencia,
          combustible: data.combustible,
          traccion: data.traccion,
          cantidad: data.cantidad,
          precio: data.precio,
        })
      })
    }
  }

  agregarCoche() {
    console.log("VAMOS A AGREGAR COCHE");
    if (this.cocheForm.get('id_usuario')?.value != null){//El ID metido en ID_usuario dentro de crear
      this._cocheService.getUsuariosPorId(this.cocheForm.get('id_usuario')?.value).subscribe(data => { 
        this.usuario = data;
        if(this.usuario.rol=="Administrador"){
          this.toastr.success('El rol de user es: Administrador, puede realizar esta funcion'); 
          this.comprobarResto();                     
        }
        else{
          this.toastr.error('El rol de user es cliente, necesitas ser administrador'); 
          this.router.navigate(['/']);       
        }
        
      }, error => {
        this.toastr.error('ID no válido');
        console.log(error);
        this.router.navigate(['/']);
      });

  }
  
}
comprobarResto(){   
  

    const COCHE: Coche = {
      marca: this.cocheForm.get('marca')?.value ,
      modelo: this.cocheForm.get('modelo')?.value,
      potencia: this.cocheForm.get('potencia')?.value,
      combustible: this.cocheForm.get('combustible')?.value,
      traccion: this.cocheForm.get('traccion')?.value,
      cantidad: this.cocheForm.get('cantidad')?.value,
      precio: this.cocheForm.get('precio')?.value
    }
   
    if (this.cocheForm.get('id_usuario') != null) {
      if (this.id != null) {
        // editar coche
        this._cocheService.editarCoche(this.id, COCHE).subscribe(data => {
          this.toastr.info('El coche fue actualizado correctamente', 'Coche Actualizado');
          this.router.navigate(['/']);
        }, error => {
          console.log(error);
          this.cocheForm.reset();
        })

      } else {
        // añadir coche
        console.log(COCHE);
        this._cocheService.guardarCoche(COCHE).subscribe(data => {
          this.toastr.success('El coche fue registrado correctamente', 'Coche Registrado');
          this.router.navigate(['/']);
        }, error => {
          console.log(error);
          this.cocheForm.reset();
        })
      }

   } else{
     this.toastr.error('Necesitas introducir tu ID');
   }
  }

 

}
