import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {
  listaForm: FormGroup;
  listUsuarios: Usuario[] = []; //Creamos un array vacio
  usuario: Usuario = new Usuario(""); //Inicializo un nuevo usuario (sin rol)
  opcion: string | null;
  texto: string | null;
  titulo = 'Listado de usuarios';
  id_usuario : string | null;
  id: string | null;
 

  constructor(private fb: FormBuilder,private router: Router,private _usuarioService: UsuarioService, private toastr: ToastrService, private aRouter: ActivatedRoute) {
    this.listaForm = this.fb.group({
      id_usuario: ['', Validators.required],
     // id: ['', Validators.required],
    })
    this.opcion = this.aRouter.snapshot.paramMap.get('opcion');
    this.texto = this.aRouter.snapshot.paramMap.get('texto');
    this.id_usuario = this.aRouter.snapshot.paramMap.get('id_usuario');

    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {//metodo que se ejecuta al inicio
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
   

    if (this.id_usuario != null){
        this._usuarioService.getUsuariosPorId(this.id_usuario).subscribe(data => { 
          this.usuario = data;
          if(this.usuario.rol=="Administrador"){
            this.toastr.success('El rol de user es: '+ this.usuario.rol);
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
      if(this.id!=null){//Si tiene ID eliminamos el usuario
        this.eliminarUsuario(this.id);
      }
      if (this.opcion != null) //Cambiamos el título si es buscar
          this.titulo = 'Usuarios encontrados por ' + this.opcion + ':';
          
        if (this.opcion == 'id') { //Buscamos usuarios por id
          this._usuarioService.getUsuariosPorId(this.texto).subscribe(data => {
            this.listUsuarios[0] = data;    
          }, error => {
            console.log(error);
          })

        } else if (this.opcion == 'rol') { //Buscamos usuarios por rol
          this._usuarioService.getUsuariosPorRol(this.texto).subscribe(data => {
            this.listUsuarios = data;
          }, error => {
            console.log(error); 
          })

        } else { //Buscamos todos los usuarios     
          this._usuarioService.getUsuarios().subscribe(data => {
            this.listUsuarios = data;
            //this.router.navigate(['/']);
          }, error => {
            console.log(error);
          })
        }
    
     }

  eliminarUsuario(id: any) {
    this._usuarioService.eliminarUsuario(id).subscribe(data => {
      this.toastr.error('El usuario fue eliminado correctamente', 'Usuario Eliminado');
      this.router.navigate(['/']);
    }, error => {
      this.toastr.error('ID no válido');
      console.log(error);
      this.router.navigate(['/']);
    })
  }

  
}

