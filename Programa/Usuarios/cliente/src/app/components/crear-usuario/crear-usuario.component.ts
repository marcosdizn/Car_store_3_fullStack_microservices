import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  usuarioForm: FormGroup;
  titulo = 'Crear usuario'; //Titulo por defecto, cambiara si es editar o crear

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private _usuarioService: UsuarioService, private aRouter: ActivatedRoute) { 
    this.usuarioForm = this.fb.group({
      rol: ['', Validators.required]
    })
    
   
  }

  ngOnInit(): void {
    this.agregarUsuario();
  }

  agregarUsuario() {
   
    const USUARIO: Usuario = {
      rol: this.usuarioForm.get('rol')?.value 
    }

      //Creamos producto
      this._usuarioService.guardarUsuario(USUARIO).subscribe(data => {
        this.toastr.success('El usuario fue creado correctamente', 'Usuario Creado con ID: ' +data._id);
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.usuarioForm.reset(); //Reseteamos el formulario
      })
    }
  
  }

   


