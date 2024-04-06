import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { Coche } from 'src/app/models/coche';
import { CompraService } from 'src/app/services/compra.service';
import { Compra } from 'src/app/models/compra';

@Component({
  selector: 'app-editar-compra',
  templateUrl: './editar-compra.component.html',
  styleUrls: ['./editar-compra.component.css']
})

export class EditarCompraComponent implements OnInit {
  compraForm: FormGroup;
  titulo = 'Editar Compra';
  id_compra: string | null;//EL ID DEL COCHE
  id_usuario: string | null;
  usuario: Usuario = new Usuario("");
  listCoches: Coche[] = [];
  listCompras: Compra[] = [];
  cantidad_AUX: number;
  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private _compraService: CompraService, private aRouter: ActivatedRoute) {
    
    this.compraForm = this.fb.group({
      id_usuario: ['', Validators.required],
      NombreCliente: ['', Validators.required],
      direccion: ['', Validators.required],
    })
    this.id_compra = this.aRouter.snapshot.paramMap.get('id');//El que le paso desde editar de listar-compras
    this.id_usuario = this.aRouter.snapshot.paramMap.get('id_usuario');//El que le paso desde listar

    this.cantidad_AUX=0;
    
  }

  ngOnInit(): void {
    this.esEditar();
  }

 
  esEditar() {
    if (this.id_usuario != null){//El ID metido en ID_usuario dentro de listar-compras

      this._compraService.getUsuariosPorId(this.id_usuario).subscribe(data => { 
        this.usuario = data;
        if(this.usuario.rol=="Cliente"){
          this.toastr.success('El rol de user es: Cliente puede realizar esta funcion'); 
          this.comprobarEditar();   //Para poder editar hace falta comprobar el ID tambien            
        }
        else{
          this.toastr.error('El rol de user es administrador, necesitas ser cliente'); 
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
    if (this.id_compra != null) {//El ID del objeto coche seleccionado
      this.titulo = 'Editar Compra';
      this._compraService.obtenerCompra(this.id_compra).subscribe(data => {
        this.compraForm.setValue({
          id_usuario : "",
          NombreCliente: data.NombreCliente,
          direccion: data.direccion,
        })
      })
    }
  }

  comprobarId() {
    if (this.compraForm.get('id_usuario')?.value != null){//El ID metido en ID_usuario dentro de crear
      this._compraService.getUsuariosPorId(this.compraForm.get('id_usuario')?.value).subscribe(data => { 
        this.usuario = data;
        if(this.usuario.rol=="Cliente"){
          this.toastr.success('El rol de user es: Cliente, puede realizar esta funcion'); 
          this.guardarCompra();                     
        }
        else{
          this.toastr.error('El rol de user es administrador, necesitas ser cliente'); 
          this.router.navigate(['/']);       
        }
        
      }, error => {
        this.toastr.error('ID no válido');
        console.log(error);
        this.router.navigate(['/']);
      });

  }
  
}

  guardarCompra() {
    
    this._compraService.getComprasPorId(this.id_compra).subscribe(data => {
      this.listCompras = data;
      this.comprobarResto();
    }, error => {
      console.log(error);
    })
  }

  comprobarResto(){ 

    const COMPRA: Compra = {
      NombreCliente: this.compraForm.get('NombreCliente')?.value ,
      direccion: this.compraForm.get('direccion')?.value,
      cantidad: this.listCompras[0].cantidad,//COJO LOS MISMOS QUE LA COMPRA ORIGINAL
      coche: this.listCompras[0].coche,
      usuario: this.listCompras[0].usuario,
      id_coche: this.listCompras[0].id_coche,
      id_usuario: this.listCompras[0].id_usuario,
      
    }
    if(this.id_compra!=null){
        this._compraService.editarCompra(this.id_compra, COMPRA).subscribe(data => {
          this.toastr.success('La compra fue actualizada correctamente', 'Compra Actualizada');
          this.router.navigate(['/']);
        }, error => {
          console.log(error);
          this.compraForm.reset();
          this.router.navigate(['/']);
          
        })
      }
  }


}
